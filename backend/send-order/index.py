import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Принимает заявку с сайта и отправляет письмо на почту владельца."""

    if event.get("httpMethod") == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Max-Age": "86400",
            },
            "body": "",
        }

    body = json.loads(event.get("body") or "{}")
    name = body.get("name", "").strip()
    phone = body.get("phone", "").strip()
    message = body.get("message", "").strip()

    if not name or not phone or not message:
        return {
            "statusCode": 400,
            "headers": {"Access-Control-Allow-Origin": "*"},
            "body": json.dumps({"error": "Заполните все поля"}),
        }

    smtp_host = os.environ["SMTP_HOST"]
    smtp_port = int(os.environ["SMTP_PORT"])
    smtp_user = os.environ["SMTP_USER"]
    smtp_password = os.environ["SMTP_PASSWORD"]
    smtp_to = os.environ["SMTP_TO"]

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"Новая заявка с сайта МелодияДня от {name}"
    msg["From"] = smtp_user
    msg["To"] = smtp_to

    html = f"""
    <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto;">
      <h2 style="color: #c026d3;">🎵 Новая заявка с сайта МелодияДня</h2>
      <table style="width:100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; color: #666; width: 140px;"><b>Имя:</b></td>
          <td style="padding: 8px 0;">{name}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666;"><b>Телефон / Email:</b></td>
          <td style="padding: 8px 0;">{phone}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666; vertical-align: top;"><b>Сообщение:</b></td>
          <td style="padding: 8px 0;">{message}</td>
        </tr>
      </table>
    </div>
    """

    msg.attach(MIMEText(html, "html"))

    with smtplib.SMTP_SSL(smtp_host, smtp_port) as server:
        server.login(smtp_user, smtp_password)
        server.sendmail(smtp_user, smtp_to, msg.as_string())

    return {
        "statusCode": 200,
        "headers": {"Access-Control-Allow-Origin": "*"},
        "body": json.dumps({"ok": True}),
    }
