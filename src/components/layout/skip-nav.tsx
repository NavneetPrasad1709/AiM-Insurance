export function SkipNav() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-cta focus:px-4 focus:py-2 focus:text-white focus:font-heading focus:font-semibold focus:shadow-md"
    >
      Skip to main content
    </a>
  );
}

export default SkipNav;
