import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <div
          className="inline-block mb-6 px-4 py-1 border-2 border-[#E63946] text-[#E63946] text-sm font-bold tracking-widest"
          style={{ fontFamily: "var(--font-bangers)", letterSpacing: "0.15em" }}
        >
          ERROR · 404
        </div>

        <h1
          className="leading-none mb-4 text-[#F0F0F0]"
          style={{
            fontFamily: "var(--font-bangers)",
            fontSize: "clamp(4rem, 16vw, 10rem)",
            letterSpacing: "0.03em",
          }}
        >
          <span className="text-[#E63946]">这个</span>
          <br />
          宇宙
          <br />
          <span className="text-[#457BFF]">不存在</span>
        </h1>

        <p className="text-[#F0F0F0]/50 text-lg mb-10">
          你访问的页面在平行宇宙中可能存在，但在这里找不到。
        </p>

        <Link
          href="/"
          className="inline-block px-8 py-3 bg-[#E63946] text-white font-bold text-lg
            border-[3px] border-[#F0F0F0] shadow-[4px_4px_0px_#F0F0F0]
            hover:shadow-[2px_2px_0px_#F0F0F0] hover:translate-x-[1px] hover:translate-y-[1px]
            transition-all duration-100 active:shadow-none"
          style={{ fontFamily: "var(--font-bangers)", letterSpacing: "0.05em" }}
        >
          返回主宇宙
        </Link>
      </div>
    </div>
  );
}
