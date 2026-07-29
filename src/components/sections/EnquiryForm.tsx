'use client';

import { useTranslations } from 'next-intl';
import { useRef, useState } from 'react';
import Section from '../Section';
import { Reveal } from '../Reveal';
import { trackGoal } from '@/lib/metrika';

type Tab = 'russia' | 'abroad';
type Status = 'idle' | 'sending' | 'success' | 'error';

const inputCls =
  'w-full rounded-lg border border-line bg-bg px-4 py-3 text-text outline-none transition focus:border-accent';

export default function EnquiryForm() {
  const t = useTranslations('form');
  const [tab, setTab] = useState<Tab>('russia');
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const openedAt = useRef(Date.now());

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const consent = fd.get('consent') === 'on';

    if (!consent) {
      setStatus('error');
      setErrorMsg(t('consentRequired'));
      return;
    }

    const payload = {
      formType: tab,
      name: fd.get('name'),
      phone: fd.get('phone'),
      messenger: fd.get('messenger'),
      date: fd.get('date'),
      location: fd.get('location'),
      people: fd.get('people'),
      country: fd.get('country'),
      dateFrom: fd.get('dateFrom'),
      dateTo: fd.get('dateTo'),
      eventType: fd.get('eventType'),
      consent,
      company: fd.get('company'), // honeypot
      ts: openedAt.current,
    };

    setStatus('sending');
    setErrorMsg('');
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        if (data.error === 'validation') throw new Error(t('validation'));
        throw new Error(t('error'));
      }
      setStatus('success');
      trackGoal('enquiry_sent');
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : t('error'));
    }
  }

  return (
    <Section id="form" alt eyebrow={t('eyebrow')} title={t('title')} subtitle={t('subtitle')}>
      <Reveal>
        <div className="mx-auto max-w-2xl">
          {/* Табы */}
          <div className="mb-8 flex rounded-full border border-line p-1">
            {(['russia', 'abroad'] as Tab[]).map((tb) => (
              <button
                key={tb}
                onClick={() => {
                  setTab(tb);
                  setStatus('idle');
                }}
                className={`flex-1 rounded-full py-3 text-sm transition ${
                  tab === tb ? 'bg-accent text-bg' : 'text-muted hover:text-text'
                }`}
              >
                {tb === 'russia' ? t('tabRussia') : t('tabAbroad')}
              </button>
            ))}
          </div>

          {status === 'success' ? (
            <div className="rounded-2xl border border-accent/40 bg-bg/40 p-10 text-center">
              <p className="text-lg text-accent">{t('success')}</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              {/* honeypot */}
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                className="absolute left-[-9999px] h-0 w-0 opacity-0"
                aria-hidden="true"
              />

              <div>
                <label className="mb-1 block text-sm text-muted">{t('fields.name')} *</label>
                <input name="name" required className={inputCls} />
              </div>

              {tab === 'russia' ? (
                <>
                  <div>
                    <label className="mb-1 block text-sm text-muted">{t('fields.phone')} *</label>
                    <input name="phone" type="tel" required className={inputCls} />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm text-muted">{t('fields.date')} *</label>
                    <input name="date" type="date" required className={inputCls} />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm text-muted">{t('fields.location')} *</label>
                    <input name="location" required className={inputCls} />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm text-muted">{t('fields.people')} *</label>
                    <input name="people" type="number" min="1" required className={inputCls} />
                  </div>
                </>
              ) : (
                <>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm text-muted">{t('fields.phone')} *</label>
                      <input name="phone" type="tel" required className={inputCls} />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm text-muted">{t('fields.messenger')} *</label>
                      <select name="messenger" required defaultValue="" className={inputCls}>
                        <option value="" disabled>—</option>
                        <option>Telegram</option>
                        <option>WhatsApp</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm text-muted">{t('fields.country')} *</label>
                    <input name="country" required className={inputCls} />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-sm text-muted">{t('fields.dateFrom')} *</label>
                      <input name="dateFrom" type="date" required className={inputCls} />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm text-muted">{t('fields.dateTo')} *</label>
                      <input name="dateTo" type="date" required className={inputCls} />
                    </div>
                  </div>
                  <div>
                    <label className="mb-1 block text-sm text-muted">{t('fields.people')} *</label>
                    <input name="people" type="number" min="1" required className={inputCls} />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm text-muted">
                      {t('fields.eventType')} {t('fields.eventTypeOptional')}
                    </label>
                    <select name="eventType" defaultValue="" className={inputCls}>
                      <option value="">—</option>
                      <option value={t('eventTypes.wedding')}>{t('eventTypes.wedding')}</option>
                      <option value={t('eventTypes.shoot')}>{t('eventTypes.shoot')}</option>
                      <option value={t('eventTypes.other')}>{t('eventTypes.other')}</option>
                    </select>
                  </div>
                </>
              )}

              <label className="flex items-start gap-3 text-sm text-muted">
                <input name="consent" type="checkbox" className="mt-1 accent-[var(--accent)]" required />
                <span>
                  {t('fields.consent')} *{' '}
                  <a href="/politic" className="text-accent hover:underline">
                    ↗
                  </a>
                </span>
              </label>

              {status === 'error' && <p className="text-sm text-red-400">{errorMsg}</p>}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full rounded-full bg-accent py-4 font-medium text-bg transition hover:bg-accent-2 disabled:opacity-60"
              >
                {status === 'sending' ? t('sending') : t('submit')}
              </button>
            </form>
          )}
        </div>
      </Reveal>
    </Section>
  );
}
