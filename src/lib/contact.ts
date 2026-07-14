export const PHONE_DISPLAY = '+91 6386871971';
export const PHONE_TEL = 'tel:+916386871971';

/** Digits only, country code first — the format wa.me expects. */
const WHATSAPP_NUMBER = '916386871971';

/**
 * Builds a wa.me link that opens the visitor's own WhatsApp (app on mobile,
 * WhatsApp Web on desktop) with `message` already typed into the composer.
 * They still have to press send, so nothing is sent on their behalf.
 */
export function whatsappLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const GENERAL_INQUIRY =
  "Hi OcassionOrbit! I'd like to know more about booking an artist for my event.";

export const BOOKING_INQUIRY =
  "Hi OcassionOrbit! I'm planning an event and would like to check availability and pricing.";

/** Plain wa.me link with a general inquiry pre-filled. */
export const PHONE_WHATSAPP = whatsappLink(GENERAL_INQUIRY);

export type PerformerDetails = {
  fullName: string;
  contactNumber: string;
  category: string;
};

/**
 * Turns a completed registration into a readable WhatsApp message, so the
 * performer's own submission reaches us as a chat they can follow up in.
 */
export function performerInquiryLink({
  fullName,
  contactNumber,
  category,
}: PerformerDetails): string {
  const lines = [
    'Hi OcassionOrbit! I want to register as a performer.',
    '',
    `Name: ${fullName || '—'}`,
    `Contact: ${contactNumber || '—'}`,
    `Performance area: ${category}`,
  ];

  return whatsappLink(lines.join('\n'));
}
