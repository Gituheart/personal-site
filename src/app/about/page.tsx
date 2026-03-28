import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "关于 Marvel | Marvel's Multiverse",
  description: "在涂鸦智能做技术支持，同时是个 AI Agent 玩家",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="mb-12">
        <div
          className="inline-block mb-4 px-3 py-0.5 border-2 border-[#E63946] text-[#E63946] text-xs font-bold tracking-widest"
          style={{ fontFamily: "var(--font-bangers)" }}
        >
          ABOUT
        </div>
        <h1
          className="text-[#F0F0F0] leading-none"
          style={{ fontFamily: "var(--font-bangers)", fontSize: "clamp(2.5rem,8vw,5rem)", letterSpacing: "0.03em" }}
        >
          关于 <span className="text-[#E63946]">Marvel</span>
        </h1>
      </div>

      <div className="space-y-8 text-[#F0F0F0]/80 text-lg leading-relaxed">
        <p>
          在涂鸦智能做技术支持，同时是个 AI Agent 玩家。
        </p>
        <p>
          喜欢用 AI 工具解决真实工作中的低效问题——质检工单、整理文档、自动推送报告，能自动化的都不想手动做第二遍。
        </p>
        <p>
          这个网站记录我写的东西、做的技能、和一些想法碎片。
        </p>

        <div className="pt-8 border-t-2 border-[#1A1A2E]">
          <p
            className="text-xs font-black tracking-widest text-[#F0F0F0]/30 mb-6"
            style={{ fontFamily: "var(--font-bangers)" }}
          >
            CONTACT
          </p>
          <div className="flex flex-col sm:flex-row items-start gap-8">
            <a
              href="https://github.com/Gituheart"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit GitHub profile"
              className="inline-block px-6 py-2.5 border-2 border-[#F0F0F0]/25 text-[#F0F0F0]/50 font-black
                hover:border-[#F0F0F0]/70 hover:text-[#F0F0F0] transition-all duration-150 tracking-widest text-sm"
              style={{ fontFamily: "var(--font-bangers)" }}
            >
              GITHUB →
            </a>
            <div className="flex items-center gap-4">
              <Image
                src="/wechat-qr.jpg"
                alt="微信二维码"
                width={120}
                height={120}
                className="border border-[#F0F0F0]/15"
              />
              <div>
                <div
                  className="text-[10px] font-black tracking-widest text-[#F0F0F0]/30 mb-1"
                  style={{ fontFamily: "var(--font-bangers)" }}
                >
                  WECHAT
                </div>
                <p className="text-sm text-[#F0F0F0]/40">扫码加我微信</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t-2 border-[#1A1A2E]">
          <p className="text-sm text-[#F0F0F0]/40" style={{ fontFamily: "var(--font-bangers)", letterSpacing: "0.05em" }}>
            EARTH-616 · MARVEL · TUYA SMART
          </p>
        </div>
      </div>
    </div>
  );
}
