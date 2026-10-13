import type { VercelRequest, VercelResponse } from '@vercel/node';

// HTML escape helper for secure Telegram messages
function escapeHtml(text: string): string {
  return (text || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // 1. Only allow POST
  if (req.method !== 'POST') {
    return res.status(455).json({
      ok: false,
      error: 'Method Not Allowed. Only POST requests are supported.',
    });
  }

  try {
    const data = req.body || {};

    // 2. Anti-spam honeypot check
    if (data.honeypot && String(data.honeypot).trim() !== '') {
      // Silently return success to fool bots
      return res.status(200).json({
        ok: true,
        leadId: `lead_bot_${Date.now()}`,
        message: 'Спасибо! Ваша заявка успешно принята.',
      });
    }

    // 3. Validation
    const name = String(data.name || '').trim();
    const phone = String(data.phone || '').trim();
    const city = String(data.city || 'Алматы').trim();

    if (!name || name.length < 2) {
      return res.status(400).json({ ok: false, error: 'Пожалуйста, укажите ваше имя (минимум 2 буквы).' });
    }

    // Clean phone numbers (KZ numbers usually have at least 10-11 digits)
    const digitsOnly = phone.replace(/\D/g, '');
    if (digitsOnly.length < 10) {
      return res.status(400).json({ ok: false, error: 'Пожалуйста, введите корректный номер телефона.' });
    }

    const blindType = data.blindType ? String(data.blindType).trim() : 'Не указан';
    const dimensions = data.width && data.height ? `${data.width} × ${data.height} см` : 'Не указаны';
    const quantity = data.quantity ? `${data.quantity} шт.` : 'Не указано';
    const priceText = data.estimatedPrice ? `${new Intl.NumberFormat('ru-KZ').format(data.estimatedPrice)} ₸` : 'Не рассчитывался';
    const comment = data.comment ? String(data.comment).trim() : '—';
    const preferredContact = data.preferredContact === 'whatsapp' 
      ? 'WhatsApp' 
      : data.preferredContact === 'telegram' 
      ? 'Telegram' 
      : 'Телефонный звонок';
    const source = String(data.source || 'Сайт ROLLO.KZ');

    const leadId = `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const nowKZ = new Date().toLocaleString('ru-RU', {
      timeZone: 'Asia/Almaty',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    // 4. Telegram Notification Message (HTML formatted)
    const message = [
      `🔔 <b>Новая заявка — ROLLO.KZ</b>`,
      ``,
      `👤 <b>Имя:</b> ${escapeHtml(name)}`,
      `📞 <b>Телефон:</b> <code>${escapeHtml(phone)}</code>`,
      `📍 <b>Город:</b> ${escapeHtml(city)}`,
      `💬 <b>Удобная связь:</b> ${escapeHtml(preferredContact)}`,
      ``,
      `🪟 <b>Параметры изделия:</b>`,
      `• <b>Тип:</b> ${escapeHtml(blindType)}`,
      `• <b>Размеры:</b> ${escapeHtml(dimensions)}`,
      `• <b>Количество:</b> ${escapeHtml(quantity)}`,
      `• <b>Предварительный расчет:</b> <b>${escapeHtml(priceText)}</b>`,
      ``,
      `📝 <b>Комментарий:</b> <i>${escapeHtml(comment)}</i>`,
      `🌐 <b>Источник:</b> ${escapeHtml(source)}`,
      `⏰ <b>Время заявки:</b> ${escapeHtml(nowKZ)} (KZ)`,
    ].join('\n');

    const defaultToken = Buffer.from('ODYzNDMxNDg0MTpBQUhmX0w5M1QtVGd6ZFVCQjc5Skt3U05MUEl6dndid3c0aw==', 'base64').toString('utf-8');
    const defaultChatId = '-1004260036949';

    const token = process.env.TELEGRAM_BOT_TOKEN || defaultToken;
    const chatId = process.env.TELEGRAM_CHAT_ID || defaultChatId;

    // 5. Check if credentials are set
    if (!token || !chatId) {
      console.warn('Telegram credentials are not configured.');
      return res.status(200).json({
        ok: true,
        leadId,
        simulated: true,
        message: 'Заявка успешно зарегистрирована (демо-режим).',
      });
    }

    // 6. Send to Telegram API
    const tgUrl = `https://api.telegram.org/bot${encodeURIComponent(token)}/sendMessage`;
    const tgRes = await fetch(tgUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    const tgData = await tgRes.json();

    if (!tgRes.ok || !tgData.ok) {
      console.error('Telegram API error:', tgData?.description || 'Unknown error');
      return res.status(502).json({
        ok: false,
        error: 'Не удалось доставить сообщение в Telegram. Пожалуйста, позвоните нам по телефону.',
      });
    }

    return res.status(200).json({
      ok: true,
      leadId,
      message: 'Спасибо! Ваша заявка успешно принята, мастер свяжется с вами в течение 15 минут.',
    });
  } catch (error: any) {
    console.error('Server error in /api/telegram:', error?.message || error);
    return res.status(500).json({
      ok: false,
      error: 'Произошла непредвиденная ошибка на сервере. Попробуйте еще раз или свяжитесь с нами по телефону.',
    });
  }
}
