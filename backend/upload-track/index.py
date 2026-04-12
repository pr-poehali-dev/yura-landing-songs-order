import json
import os
import base64
import uuid
import psycopg2
import boto3

def handler(event: dict, context) -> dict:
    """Загрузка аудиотрека в S3 и сохранение метаданных в БД"""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Max-Age': '86400'}, 'body': ''}

    body = json.loads(event.get('body') or '{}')
    title = body.get('title', '').strip()
    description = body.get('description', '').strip()
    genre = body.get('genre', '').strip()
    duration = body.get('duration', '').strip()
    file_data = body.get('file_data', '')
    file_name = body.get('file_name', 'track.mp3')

    if not title or not file_data:
        return {'statusCode': 400, 'headers': {'Access-Control-Allow-Origin': '*'}, 'body': json.dumps({'error': 'Нужно указать название и файл'})}

    audio_bytes = base64.b64decode(file_data)
    file_ext = file_name.rsplit('.', 1)[-1].lower() if '.' in file_name else 'mp3'
    file_key = f"tracks/{uuid.uuid4()}.{file_ext}"

    s3 = boto3.client(
        's3',
        endpoint_url='https://bucket.poehali.dev',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY']
    )
    content_type = 'audio/mpeg' if file_ext == 'mp3' else f'audio/{file_ext}'
    s3.put_object(Bucket='files', Key=file_key, Body=audio_bytes, ContentType=content_type)

    file_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/bucket/{file_key}"

    schema = os.environ.get('MAIN_DB_SCHEMA', 'public')
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    cur.execute(
        f"INSERT INTO {schema}.tracks (title, description, genre, duration, file_url, file_key) VALUES (%s, %s, %s, %s, %s, %s) RETURNING id",
        (title, description, genre, duration, file_url, file_key)
    )
    track_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'id': track_id, 'file_url': file_url, 'title': title})
    }
