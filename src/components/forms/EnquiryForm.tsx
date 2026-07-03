import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { CheckCircle2, Send } from 'lucide-react'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'
import { enquirySchema, type EnquiryForm as EnquiryFormValues } from './enquirySchema'
import { Button } from '@/components/ui/Button'
import { branches } from '@/data/branches'
import { courses } from '@/data/courses'
import { ACADEMY } from '@/lib/constants'
import { whatsappLink, cn } from '@/lib/utils'
import { logToSheet } from '@/lib/sheets'

const fieldBase =
  'w-full rounded-xl border bg-surface px-4 py-3 text-[15px] text-heading placeholder:text-muted/60 transition-colors focus:outline-none focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20'

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-heading">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-danger">{error}</span>}
    </label>
  )
}

export function EnquiryForm() {
  const [submitted, setSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { branch: '', level: '' },
  })

  const onSubmit = (data: EnquiryFormValues) => {
    // Capture the lead to Google Sheets (fire-and-forget) before anything else.
    logToSheet({ type: 'enquiry', ...data })

    // No backend yet — send the enquiry straight to WhatsApp with all details.
    const lines = [
      'Hello DD Chess Academy! I would like to book a free demo class.',
      '',
      `Student: ${data.studentName} (age ${data.age})`,
      `Parent: ${data.parentName}`,
      `Phone: ${data.phone}`,
      `Level: ${data.level}`,
      `Preferred centre: ${data.branch}`,
      data.email ? `Email: ${data.email}` : '',
      data.message ? `Message: ${data.message}` : '',
    ].filter(Boolean)

    window.open(
      whatsappLink(ACADEMY.whatsapp, lines.join('\n')),
      '_blank',
      'noopener,noreferrer',
    )
    setSubmitted(true)
    reset()
  }

  if (submitted) {
    const values = getValues()
    const wa = whatsappLink(
      ACADEMY.whatsapp,
      `Hello DD Chess Academy! I just submitted an enquiry for ${values.studentName || 'my child'}.`,
    )
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="grid place-items-center rounded-[22px] border border-success/30 bg-success/5 p-10 text-center"
      >
        <CheckCircle2 className="size-14 text-success" />
        <h3 className="mt-5 font-display text-2xl font-semibold text-heading">
          Almost there!
        </h3>
        <p className="mt-2 max-w-sm text-muted">
          WhatsApp is opening with your enquiry pre-filled — just tap send and
          we'll reply to arrange your free demo class. Didn't open? Use the
          button below.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button
            as="a"
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            variant="whatsapp"
            iconLeft={<WhatsAppIcon className="size-5" />}
          >
            Message us now
          </Button>
          <Button variant="ghost" onClick={() => setSubmitted(false)}>
            Submit another
          </Button>
        </div>
      </motion.div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="rounded-[22px] border border-hairline bg-canvas p-6 shadow-[var(--shadow-soft)] sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Student Name" error={errors.studentName?.message}>
          <input
            {...register('studentName')}
            className={cn(fieldBase)}
            placeholder="Child's full name"
            autoComplete="off"
          />
        </Field>
        <Field label="Parent / Your Name" error={errors.parentName?.message}>
          <input
            {...register('parentName')}
            className={cn(fieldBase)}
            placeholder="Your full name"
            autoComplete="name"
          />
        </Field>
        <Field label="Phone / WhatsApp" error={errors.phone?.message}>
          <input
            {...register('phone')}
            type="tel"
            inputMode="tel"
            className={cn(fieldBase)}
            placeholder="+91 ..."
            autoComplete="tel"
          />
        </Field>
        <Field label="Email (optional)" error={errors.email?.message}>
          <input
            {...register('email')}
            type="email"
            className={cn(fieldBase)}
            placeholder="you@email.com"
            autoComplete="email"
          />
        </Field>
        <Field label="Student Age" error={errors.age?.message}>
          <input
            {...register('age')}
            type="number"
            min={5}
            className={cn(fieldBase)}
            placeholder="e.g. 8"
          />
        </Field>
        <Field label="Preferred Centre" error={errors.branch?.message}>
          <select {...register('branch')} className={cn(fieldBase)}>
            <option value="">Select a centre</option>
            {branches.map((b) => (
              <option key={`${b.name}-${b.area}`} value={`${b.name}, ${b.area}`}>
                {b.name} — {b.area}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Level" error={errors.level?.message}>
          <select {...register('level')} className={cn(fieldBase)}>
            <option value="">Select a level</option>
            {courses.map((c) => (
              <option key={c.slug} value={c.title}>
                {c.title}
              </option>
            ))}
            <option value="Not sure">Not sure yet</option>
          </select>
        </Field>
        <div className="sm:col-span-1">
          <Field label="Message (optional)" error={errors.message?.message}>
            <input
              {...register('message')}
              className={cn(fieldBase)}
              placeholder="Anything you'd like us to know"
            />
          </Field>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button
          type="submit"
          size="lg"
          loading={isSubmitting}
          iconRight={!isSubmitting ? <Send className="size-4" /> : undefined}
          className="sm:flex-1"
        >
          {isSubmitting ? 'Sending...' : 'Book My Free Demo'}
        </Button>
        <p className="text-center text-xs text-muted sm:text-left">
          We'll reply on WhatsApp within 24 hours.
        </p>
      </div>
    </form>
  )
}
