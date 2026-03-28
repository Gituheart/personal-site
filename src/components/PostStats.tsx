"use client";

import { useEffect, useState } from "react";

interface Props {
  section: string;
  slug: string;
  accent: string;
}

export default function PostStats({ section, slug, accent }: Props) {
  const [views, setViews] = useState<number | null>(null);
  const [likes, setLikes] = useState<number | null>(null);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const likedKey = `liked:${section}:${slug}`;
    const viewedKey = `viewed:${section}:${slug}`;
    setLiked(!!localStorage.getItem(likedKey));

    const viewPromise = sessionStorage.getItem(viewedKey)
      ? fetch(`/api/views/${section}/${slug}`).then((r) => r.json())
      : fetch(`/api/views/${section}/${slug}`, { method: "POST" }).then((r) => {
          sessionStorage.setItem(viewedKey, "1");
          return r.json();
        });

    Promise.all([
      viewPromise,
      fetch(`/api/likes/${section}/${slug}`).then((r) => r.json()),
    ]).then(([vData, lData]) => {
      setViews(vData.views);
      setLikes(lData.likes);
    });
  }, [section, slug]);

  const handleLike = async () => {
    if (liked) return;
    const res = await fetch(`/api/likes/${section}/${slug}`, { method: "POST" });
    const data = await res.json();
    setLikes(data.likes);
    setLiked(true);
    localStorage.setItem(`liked:${section}:${slug}`, "1");
  };

  return (
    <div
      className="flex items-center gap-4 text-xs tracking-widest"
      style={{ fontFamily: "var(--font-bangers)" }}
    >
      {views !== null && (
        <span className="text-[#F0F0F0]/30">{views.toLocaleString()} VIEWS</span>
      )}
      <button
        onClick={handleLike}
        disabled={liked}
        className={`flex items-center gap-1 transition-all duration-150 ${
          liked ? "cursor-default" : "hover:opacity-100"
        }`}
        style={{ color: liked ? accent : `${accent}70` }}
        aria-label={liked ? "已点赞" : "点赞"}
      >
        <span className="text-sm">{liked ? "♥" : "♡"}</span>
        <span>{likes ?? "–"}</span>
      </button>
    </div>
  );
}
