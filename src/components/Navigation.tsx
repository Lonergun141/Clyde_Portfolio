const Navigation = () => {
  return (
    <nav className="fixed top-0 w-full bg-[#fafafa]/80 backdrop-blur-sm z-50 border-b border-[#eaeaea]">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <a href="/" className="font-mono text-[#1a1a1a] hover:text-[#444]">
          cg/
        </a>
        <a
          href="/profile"
          className="font-mono text-[#1a1a1a] hover:text-[#444] text-sm"
        >
          about.me
        </a>
      </div>
    </nav>
  );
};

export default Navigation; 