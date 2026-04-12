import json
import os
import psycopg2

def handler(event: dict, context) -> dict:
    """Получение списка всех треков из БД"""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, DELETE, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Max-Age': '86400'}, 'body': ''}

    schema = os.environ.get('MAIN_DB_SCHEMA', 'public')
    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()

    if event.get('httpMethod') == 'DELETE':
        params = event.get('queryStringParameters') or {}
        track_id = params.get('id')
        if not track_id:
            cur.close()
            conn.close()
            return {'statusCode': 400, 'headers': {'Access-Control-Allow-Origin': '*'}, 'body': json.dumps({'error': 'id обязателен'})}
        cur.execute(f"DELETE FROM {schema}.tracks WHERE id = %s", (track_id,))
        conn.commit()
        cur.close()
        conn.close()
        return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*'}, 'body': json.dumps({'ok': True})}

    cur.execute(f"SELECT id, title, description, genre, duration, file_url, created_at FROM {schema}.tracks ORDER BY created_at DESC")
    rows = cur.fetchall()
    cur.close()
    conn.close()

    tracks = [
        {'id': r[0], 'title': r[1], 'description': r[2], 'genre': r[3], 'duration': r[4], 'file_url': r[5], 'created_at': str(r[6])}
        for r in rows
    ]

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'tracks': tracks})
    }
