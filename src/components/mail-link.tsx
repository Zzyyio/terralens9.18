import { PRODUCER_MAIL, PRODUCER_MAILTO } from "@/lib/contact";
import { cn } from "@/lib/utils";

/**
 * Cloudflare Email Address Obfuscation rewrites bare mailto: into
 * /cdn-cgi/l/email-protection. Their documented escape is email_off comments
 * around the address. Keep the visible text identical to the mailto target.
 */
export function MailLink({ className }: { className?: string }) {
  const cls = cn("text-ice hover:underline", className);
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: `<!--email_off--><a href="${PRODUCER_MAILTO}" class="${cls}">${PRODUCER_MAIL}</a><!--/email_off-->`,
      }}
    />
  );
}

export function EmailOff({ children }: { children: string }) {
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: `<!--email_off-->${children}<!--/email_off-->`,
      }}
    />
  );
}
