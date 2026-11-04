"use client";

import React, { useEffect, useCallback } from "react";
import { IconX } from "@tabler/icons-react";

export interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  logoSrc: string;
  activeId?: string;
  onNavigate?: (id: string) => void;
}

const NAV_ITEMS = [
  { id: "hero", label: "الرئيسية", exact: true },
  { id: "vision", label: "من نحن؟" },
  { id: "services", label: "الخدمات" },
  { id: "work", label: "أعمالنا" },
  { id: "products", label: "المنتجات", target: "work" },
  { id: "pricing", label: "الباقات والأسعار", target: "services" },
  { id: "industries", label: "القطاعات" },
  { id: "technologies", label: "التقنيات والتكنولوجيا", target: "vision" },
  { id: "careers", label: "الوظائف", target: "team" },
  { id: "faq", label: "الأسئلة الشائعة", target: "contact" },
  { id: "blog", label: "المدونة", target: "reviews" },
];

export default function SideDrawer({
  isOpen,
  onClose,
  logoSrc,
  activeId = "hero",
  onNavigate,
}: SideDrawerProps) {
  // Handle keyboard Escape and body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleItemClick = useCallback(
    (targetId: string) => {
      onClose();
      if (onNavigate) {
        onNavigate(targetId);
      } else {
        setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 150);
      }
    },
    [onClose, onNavigate]
  );

  return (
    <>
      {/* Backdrop Dismiss Area (Translucent Dark Overlay with Backdrop Blur) */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-[95] bg-[#05080E]/65 backdrop-blur-sm transition-opacity duration-300 ease-out ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      {/* Master Side Drawer Menu Component (400px in Figma) */}
      <aside
        dir="rtl"
        aria-label="القائمة الجانبية الرئيسية"
        aria-modal="true"
        role="dialog"
        className={`fixed top-0 bottom-0 right-0 z-[100] flex h-full w-full sm:w-[400px] flex-col overflow-y-auto border-s border-[#CBD5E1] bg-white rounded-s-2xl shadow-2xl shadow-slate-950/40 transition-transform duration-300 ease-out will-change-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          {/* Top Header Bar: Swapped: Brand Logo and Close Button */}
          <div className="flex h-[96px] items-center justify-between px-6">
            {/* Brand Logo */}
            <div className="flex items-center gap-3">
              <img
                src={logoSrc}
                alt="محفز التفكير"
                className="h-[52px] w-[52px] object-contain transition-transform hover:scale-105"
              />
            </div>

            {/* Close Circle Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="إغلاق القائمة"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[#CBD5E1] bg-[#F1F5F9] text-[#0F172A] transition-all hover:bg-slate-200 hover:scale-105 active:scale-95 cursor-pointer shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500/40"
            >
              <IconX className="h-4.5 w-4.5 text-slate-700 stroke-[2.2]" />
            </button>
          </div>

          {/* Divider Drawer Top */}
          <div className="mx-6 h-[1px] bg-[#E2E8F0]" />

          {/* Navigation Items (Exact match to Figma Component 400px) */}
          <nav className="flex flex-col space-y-1.5 px-6 py-5">
            {NAV_ITEMS.map((item) => {
              const isActive =
                activeId === item.id ||
                (item.exact && (!activeId || activeId === "hero"));

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleItemClick(item.target || item.id)}
                  className={`font-ar flex items-center justify-start w-full rounded-md text-right transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#F1F5F9] text-[#0284C7] font-extrabold text-[19px] px-4 py-3 shadow-sm"
                      : "text-[#0284C7] font-bold text-[18px] px-4 py-2.5 hover:bg-sky-50/80 hover:translate-x-[-3px]"
                  }`}
                >
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}
