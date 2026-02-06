import Link from "next/link";

/**
 * Auth layout - centered card layout for login/register
 */
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-muted/30">
      {/* Logo */}
      <Link
        href="/"
        className="flex items-center gap-2 mb-8"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-xl">
          P
        </div>
        <span className="text-2xl font-bold">PaymentPredictor</span>
      </Link>

      {/* Content */}
      <div className="w-full max-w-md">{children}</div>

      {/* Footer */}
      <p className="text-sm text-muted-foreground mt-8">
        © 2026 PaymentPredictor. All rights reserved.
      </p>
    </div>
  );
}
