import {
  IconArrowLeft,
  IconBuildingBank,
  IconBus,
  IconFileText,
  IconHeartbeat,
  IconMenu2,
  IconPhone,
  IconPlane,
  IconSearch,
  IconSun,
} from "@tabler/icons-react";
import { useCallback, useEffect, useRef, useState } from "react";

import TechText from "@/components/ui/TechText";
import TiltedCard from "@/components/ui/TiltedCard";
import ReflectiveCard from "@/components/ui/ReflectiveCard";
import ProfileCard from "@/components/ui/ProfileCard";
import FluxLines from "@/components/ui/FluxLines";
import SideDrawer from "@/components/ui/SideDrawer";
import { APP_TITLE } from "@/lib/app-config";

type DramaticStage = "idle" | "igniting" | "locked";

function useDramaticStage<T extends HTMLElement = HTMLElement>(options?: {
  threshold?: number;
  initialInView?: boolean;
}) {
  const ref = useRef<T | null>(null);
  const [stage, setStage] = useState<DramaticStage>(options?.initialInView ? "locked" : "idle");
  const [isIntersecting, setIsIntersecting] = useState(options?.initialInView ?? false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const rootEl = document.querySelector(".agent-native-app-main") || null;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        if (entry.isIntersecting) {
          setStage((prev) => (prev === "idle" ? "igniting" : prev));
        }
      },
      {
        root: rootEl,
        threshold: options?.threshold ?? 0.2,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options?.threshold]);

  useEffect(() => {
    if (stage === "igniting") {
      const timer = setTimeout(() => {
        setStage("locked");
      }, 2200);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  const inView = stage !== "idle";
  return [ref, stage, inView, isIntersecting] as const;
}

function LaserHorizon() {
  return <div className="laser-horizon pointer-events-none" aria-hidden="true" />;
}

function SpatialVoidFlare({ intense }: { intense?: boolean }) {
  return (
    <div
      className={`spatial-void-flare pointer-events-none ${
        intense ? "spatial-void-flare-intense" : ""
      }`}
      aria-hidden="true"
    />
  );
}

function SectionTelemetry({ code, label }: { code: string; label: string }) {
  return (
    <div className="telemetry-tag pointer-events-none absolute top-5 left-6 z-20 hidden items-center gap-2.5 font-mono text-[10px] tracking-wider text-slate-400 select-none md:flex">
      <span className="relative flex h-2 w-2">
        <span className="ping-ring absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-500" />
      </span>
      <span className="font-semibold text-slate-500">[{code}]</span>
      <span className="text-slate-300">/</span>
      <span className="text-sky-500/90 font-medium">{label}</span>
    </div>
  );
}

function useInView<T extends HTMLElement = HTMLElement>(options?: {
  threshold?: number;
  initialInView?: boolean;
}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(options?.initialInView ?? false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const rootEl = document.querySelector(".agent-native-app-main") || null;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      {
        root: rootEl,
        threshold: options?.threshold ?? 0.3,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options?.threshold]);

  return [ref, inView] as const;
}

export function meta() {
  return [
    { title: APP_TITLE },
    {
      name: "description",
      content: "شريككم الهندسي لتطوير المنصات المؤسسية وتطبيقات الجوال والذكاء الاصطناعي",
    },
  ];
}

const A = "https://api.builder.io/api/v1/image/assets/TEMP/";

const getBasePath = () => {
  if (typeof window !== "undefined") {
    if (window.location.pathname.startsWith("/mohafeztafker")) {
      return "/mohafeztafker";
    }
  }
  if (typeof process !== "undefined" && process.env?.GITHUB_PAGES === "true") {
    return "/mohafeztafker";
  }
  const b = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");
  return b && b !== "/" ? b : "";
};

const withBase = (p: string) => {
  if (!p) return "";
  if (p.startsWith("http://") || p.startsWith("https://")) return p;
  if (p.startsWith("/mohafeztafker/")) return p;
  const base = getBasePath();
  const clean = p.replace(/^\//, "");
  return base ? `${base}/${clean}` : `/${clean}`;
};
const IMG = {
  logo: `${A}4fc341c99cb92269986cd1da4c23dd3608f83bba?width=198`,
  footerLogo: `${A}0a91b6ee394a779a22a568d850ebf5e94375370d?width=288`,
  hero: `${A}093320efb2fc8cfed93b09a0d808a1127d764c2d?width=3512`,
  vision: `${A}dabf32f091b9180f895368a29fca85a9ff52ff0a?width=1518`,
  circuit: `${A}48bf4d192b8e15ceb093bcaba6b0ee4282e66a81?width=2151`,
  circuit2: `${A}3b98e15955c8c4455d98f9c353ebdd74eedeb01f?width=2880`,
  avatar: `${A}1a11fe0d17be075dfe9ae893ccb85013c37259fa?width=188`,
};

function ElectricCircuit({ inView }: { inView: boolean }) {
  return (
    <img
      src={IMG.circuit}
      alt=""
      className={`pointer-events-none absolute -left-24 top-0 hidden h-full transition-all duration-1000 ease-cinematic lg:block ${
        inView ? "opacity-75 scale-100" : "opacity-20 scale-105"
      }`}
    />
  );
}

const btn =
  "btn-tactile font-ar inline-flex items-center justify-center rounded-full bg-primary font-bold text-white shadow-lg shadow-sky-500/25";

const steps = ["١. الرؤية", "٢. المهمة", "٣. الهدف"];

function FigmaIconPhone({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 104 107" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M46.7151 39.8601C46.0586 32.3079 38.1798 28.6023 37.8464 28.451C37.5347 28.3045 37.1854 28.2577 36.8461 28.317C27.7505 29.826 26.3823 35.1198 26.3273 35.3398C26.2525 35.6464 26.2644 35.9677 26.3617 36.2679C37.2105 69.9279 59.757 76.167 67.1683 78.2192C67.7389 78.3773 68.2098 78.5045 68.5673 78.6214C68.9753 78.7547 69.4185 78.7289 69.8083 78.5492C70.0351 78.446 75.3908 75.9229 76.7005 67.6935C76.7586 67.3343 76.7008 66.9659 76.5355 66.6417C76.4186 66.4148 73.617 61.0832 65.8483 59.1995C65.5847 59.1321 65.3087 59.1297 65.0441 59.1926C64.7794 59.2555 64.534 59.3817 64.3289 59.5604C61.878 61.6539 58.492 63.8848 57.0311 64.1151C47.2376 59.3267 41.7686 50.1382 41.5623 48.3954C41.442 47.4157 43.6867 43.9748 46.2683 41.1767C46.4305 41.0006 46.5541 40.7924 46.6311 40.5657C46.708 40.3389 46.7367 40.0986 46.7151 39.8601Z"
        fill="currentColor"
      />
    </svg>
  );
}

function FigmaIconPlane({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 82 84" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M59.2915 23.7085C58.8332 23.2502 57.9165 23.021 57.229 23.021L56.0832 23.2502C51.729 24.1668 46.229 27.6043 42.5623 30.8127L24.4582 24.8543C23.5415 24.6252 22.6248 24.8543 22.1665 25.3127L18.729 28.521C18.2707 28.9793 18.0415 29.896 18.0415 30.5835C18.0415 31.271 18.4998 31.9585 19.1873 32.1877L32.9373 40.4377L30.8748 42.5002H21.9373C21.2498 42.5002 20.7915 42.7293 20.3332 43.1877L18.729 44.7918C18.2707 45.2502 18.0415 45.9377 18.0415 46.6252C18.0415 47.3127 18.4998 48.0002 18.9582 48.2293L28.354 54.4168L34.5415 63.8127C34.9998 64.271 35.4582 64.7293 36.1457 64.7293C36.8332 64.7293 37.5207 64.5002 37.979 64.0418L39.5832 62.4377C40.0415 61.9793 40.2707 61.521 40.2707 60.8335V52.1252L42.3332 50.0627L50.5832 63.8127C51.0415 64.5002 51.4998 64.7293 52.1873 64.9585H52.4165C53.104 64.9585 53.5623 64.7293 54.0207 64.271L57.229 61.0627C57.9165 60.3752 58.1457 59.4585 57.6873 58.771L51.729 40.6668C54.9373 37.0002 58.3748 31.5002 59.2915 27.146L59.5207 26.0002C59.979 25.0835 59.7498 24.1668 59.2915 23.7085Z"
        fill="currentColor"
      />
    </svg>
  );
}

function FigmaIconHeartbeat({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 82 84" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M58.309 40.5696H63.5884C63.8101 40.5696 63.963 40.8006 63.8689 41.0019C63.1592 42.5179 62.1896 43.898 61.004 45.0796L41.182 64.8686C40.808 65.2426 40.192 65.2426 39.818 64.8686L19.996 45.0796C19.6007 44.6845 19.2287 44.2669 18.8817 43.8289C18.8453 43.7841 18.8224 43.7298 18.8156 43.6725C18.8088 43.6152 18.8183 43.5572 18.8431 43.505C18.8679 43.4529 18.907 43.4089 18.9557 43.378C19.0045 43.3471 19.061 43.3307 19.1187 43.3306H28.389C28.8794 43.3336 29.3608 43.1986 29.7781 42.9408C30.1954 42.683 30.5316 42.313 30.7485 41.8731L31.9315 39.5065C31.9709 39.4277 32.0308 39.361 32.1048 39.3133C32.1788 39.2656 32.2643 39.2387 32.3523 39.2354C32.4403 39.232 32.5276 39.2524 32.605 39.2944C32.6824 39.3364 32.7471 39.3984 32.7923 39.474L39.411 50.5466C39.6365 50.9151 40.038 51.1461 40.467 51.1461C40.4835 51.1461 40.5 51.1406 40.5165 51.1406C40.962 51.1241 41.369 50.8656 41.567 50.4641L43.492 46.6196C43.657 46.2841 43.998 46.0751 44.3775 46.0751H47.5235C48.607 46.0751 49.5695 45.4261 49.971 44.4196L53.6807 35.1334C53.8507 34.7088 54.4579 34.7264 54.6025 35.1604L55.801 38.7601C55.9753 39.2874 56.3116 39.7461 56.7619 40.0711C57.2122 40.396 57.7537 40.5705 58.309 40.5696Z"
        fill="currentColor"
      />
      <path
        d="M64.7257 38.6934C64.7073 38.7586 64.6681 38.8159 64.6141 38.8567C64.56 38.8975 64.4942 38.9195 64.4265 38.9195H58.3089C58.1009 38.9198 57.8981 38.8546 57.7293 38.7332C57.5605 38.6117 57.4342 38.4402 57.3684 38.243L55.3829 32.281C55.2179 31.786 54.7724 31.4505 54.2499 31.4395C53.9979 31.4292 53.749 31.4978 53.538 31.6359C53.327 31.774 53.1644 31.9745 53.0729 32.2095L48.4419 43.8035C48.3689 43.9874 48.2423 44.145 48.0784 44.2559C47.9146 44.3667 47.7212 44.4257 47.5234 44.425H44.3774C43.3709 44.425 42.4634 44.986 42.0124 45.8825L40.4339 49.0395L33.3609 37.2035C33.2479 37.0131 33.0854 36.8568 32.8908 36.7513C32.6962 36.6457 32.4766 36.5948 32.2554 36.604C31.8044 36.6205 31.4029 36.879 31.1994 37.2805L29.2744 41.136C29.1039 41.4715 28.7684 41.6805 28.3889 41.6805H17.6595C17.6026 41.6804 17.5469 41.6648 17.4983 41.6355C17.4497 41.6061 17.4099 41.5641 17.3834 41.5138C14.541 36.0562 15.4116 29.1647 19.9959 24.5755C25.5564 19.0205 34.5049 18.916 40.1864 24.2675C40.3624 24.4325 40.6374 24.4325 40.8134 24.2675C46.4949 18.916 55.4434 19.0205 61.0039 24.5755C64.8275 28.3991 66.0644 33.8281 64.7257 38.6934Z"
        fill="currentColor"
      />
    </svg>
  );
}

function FigmaIconDocuments({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 82 84" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M62.8438 25.3125H57.6875V20.1562C57.6875 19.7004 57.5064 19.2632 57.1841 18.9409C56.8618 18.6186 56.4246 18.4375 55.9688 18.4375H25.0312C24.5754 18.4375 24.1382 18.6186 23.8159 18.9409C23.4936 19.2632 23.3125 19.7004 23.3125 20.1562V57.9688C23.3125 58.4246 23.4936 58.8618 23.8159 59.1841C24.1382 59.5064 24.5754 59.6875 25.0312 59.6875H30.1875V64.8438C30.1875 65.2996 30.3686 65.7368 30.6909 66.0591C31.0132 66.3814 31.4504 66.5625 31.9062 66.5625H62.8438C63.2996 66.5625 63.7368 66.3814 64.0591 66.0591C64.3814 65.7368 64.5625 65.2996 64.5625 64.8438V27.0312C64.5625 26.5754 64.3814 26.1382 64.0591 25.8159C63.7368 25.4936 63.2996 25.3125 62.8438 25.3125ZM31.9062 25.3125H49.0938C49.5496 25.3125 49.9868 25.4936 50.3091 25.8159C50.6314 26.1382 50.8125 26.5754 50.8125 27.0312C50.8125 27.4871 50.6314 27.9243 50.3091 28.2466C49.9868 28.5689 49.5496 28.75 49.0938 28.75H31.9062C31.4504 28.75 31.0132 28.5689 30.6909 28.2466C30.3686 27.9243 30.1875 27.4871 30.1875 27.0312C30.1875 26.5754 30.3686 26.1382 30.6909 25.8159C31.0132 25.4936 31.4504 25.3125 31.9062 25.3125ZM31.9062 32.1875H49.0938C49.5496 32.1875 49.9868 32.3686 50.3091 32.6909C50.6314 33.0132 50.8125 33.4504 50.8125 33.9062C50.8125 34.3621 50.6314 34.7993 50.3091 35.1216C49.9868 35.4439 49.5496 35.625 49.0938 35.625H31.9062C31.4504 35.625 31.0132 35.4439 30.6909 35.1216C30.3686 34.7993 30.1875 34.3621 30.1875 33.9062C30.1875 33.4504 30.3686 33.0132 30.6909 32.6909C31.0132 32.3686 31.4504 32.1875 31.9062 32.1875ZM31.9062 39.0625H49.0938C49.5496 39.0625 49.9868 39.2436 50.3091 39.5659C50.6314 39.8882 50.8125 40.3254 50.8125 40.7812C50.8125 41.2371 50.6314 41.6743 50.3091 41.9966C49.9868 42.3189 49.5496 42.5 49.0938 42.5H31.9062C31.4504 42.5 31.0132 42.3189 30.6909 41.9966C30.3686 41.6743 30.1875 41.2371 30.1875 40.7812C30.1875 40.3254 30.3686 39.8882 30.6909 39.5659C31.0132 39.2436 31.4504 39.0625 31.9062 39.0625ZM31.9062 45.9375H49.0938C49.5496 45.9375 49.9868 46.1186 50.3091 46.4409C50.6314 46.7632 50.8125 47.2004 50.8125 47.6562C50.8125 48.1121 50.6314 48.5493 50.3091 48.8716C49.9868 49.1939 49.5496 49.375 49.0938 49.375H31.9062C31.4504 49.375 31.0132 49.1939 30.6909 48.8716C30.3686 48.5493 30.1875 48.1121 30.1875 47.6562C30.1875 47.2004 30.3686 46.7632 30.6909 46.4409C31.0132 46.1186 31.4504 45.9375 31.9062 45.9375ZM61.125 63.125H33.625V59.6875H55.9688C56.4246 59.6875 56.8618 59.5064 57.1841 59.1841C57.5064 58.8618 57.6875 58.4246 57.6875 57.9688V28.75H61.125V63.125Z"
        fill="currentColor"
      />
    </svg>
  );
}

function FigmaIconBus({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 82 84" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22.1665 51.6668C22.1665 53.695 23.0603 55.4939 24.4582 56.7543V60.8335C24.4582 62.0939 25.4894 63.1252 26.7498 63.1252H29.0415C29.6493 63.1252 30.2322 62.8837 30.662 62.454C31.0917 62.0242 31.3332 61.4413 31.3332 60.8335V58.5418H49.6665V60.8335C49.6665 61.4413 49.9079 62.0242 50.3377 62.454C50.7675 62.8837 51.3504 63.1252 51.9582 63.1252H54.2498C55.5103 63.1252 56.5415 62.0939 56.5415 60.8335V56.7543C57.9394 55.4939 58.8332 53.695 58.8332 51.6668V28.7502C58.8332 20.7293 50.629 19.5835 40.4998 19.5835C30.3707 19.5835 22.1665 20.7293 22.1665 28.7502V51.6668ZM30.1873 53.9585C28.2853 53.9585 26.7498 52.4231 26.7498 50.521C26.7498 48.6189 28.2853 47.0835 30.1873 47.0835C32.0894 47.0835 33.6248 48.6189 33.6248 50.521C33.6248 52.4231 32.0894 53.9585 30.1873 53.9585ZM50.8123 53.9585C48.9103 53.9585 47.3748 52.4231 47.3748 50.521C47.3748 48.6189 48.9103 47.0835 50.8123 47.0835C52.7144 47.0835 54.2498 48.6189 54.2498 50.521C54.2498 52.4231 52.7144 53.9585 50.8123 53.9585ZM54.2498 40.2085H26.7498V28.7502H54.2498V40.2085Z"
        fill="currentColor"
      />
    </svg>
  );
}

const industries = [
  {
    id: "telecom",
    title: "الاتصالات",
    subtitle: "بنية تحتية ومعالجة بيانات فائقة الكثافة",
    desc: "تطوير منصات فوترة لحظية، وبوابات إدارة اشتراكات العملاء، ومعماريات معالجة التدفقات البيانية الضخمة بتوافق كامل مع أطر هيئة الاتصالات والفضاء والتقنية.",
    icon: FigmaIconPhone,
  },
  {
    id: "travel",
    title: "السفر",
    subtitle: "محركات حجز وتشغيل لوجستي عالي التوفر",
    desc: "محركات حجز طيران وإدارة رحلات وفنادق عالية التزامن، مع ربط سيادي مؤتمت مع أنظمة التوزيع العالمية (GDS) ومزودي حلول الضيافة والأنشطة السياحية.",
    icon: FigmaIconPlane,
  },
  {
    id: "health",
    title: "الصحة العامة",
    subtitle: "منصات الرعاية الصحية والسجل الرقمي الموحد",
    desc: "منظومات تكامل السجلات الطبية الإلكترونية وتتبع المؤشرات السريرية الحساسة، مشيدة وفق اشتراطات هيئة الصحة العامة وأعلى ضوابط حماية البيانات الصحية.",
    icon: FigmaIconHeartbeat,
  },
  {
    id: "insurance",
    title: "التأمينات",
    subtitle: "أتمتة الاكتتاب وإدارة المطالبات الذكية",
    desc: "أتمتة دورة حياة وثائق التأمين وتسوية المطالبات لحظياً مع محركات تحليل المخاطر الفورية المتوافقة مع تنظيمات هيئة التأمين والبنك المركزي السعودي.",
    icon: FigmaIconDocuments,
  },
  {
    id: "transport",
    title: "النقل الذكي",
    subtitle: "إدارة الأساطيل ومسارات الحركة اللحظية",
    desc: "منظومة تتبع الأساطيل وإدارة سلاسل الإمداد مع خوارزميات توجيه ديناميكية لتقليص الانبعاثات والهدر التشغيلي وفق مستهدفات النقل والخدمات اللوجستية.",
    icon: FigmaIconBus,
  },
];

const services = [
  {
    num: "01",
    t: "المنصات المؤسسية والحوسبة السحابية",
    badge: "Cloud & Sovereign Systems",
    desc: "بناء أنظمة سحابية هجينة وموزعة عالية التوافر ومستضافة بنسبة 100% داخل مراكز بيانات المملكة مع الامتثال الصارم لضوابط NCA.",
    img: `${A}42226f901ca56075691a54449713463dc3e8f6cc?width=1076`,
    deliverables: [
      "معمارية سحابية هجينة مصممة للتوسع المليوني",
      "توطين كامل للبيانات مع ضوابط NCA ECC",
      "اتفاقيات مستوى خدمة SLA تصل إلى 99.98%",
    ],
  },
  {
    num: "02",
    t: "هندسة وتطوير تطبيقات الجوال المتقدمة",
    badge: "Mobile Architecture (iOS & Android)",
    desc: "تطوير تطبيقات أصلية وهجينة فائقة الأداء بواجهات مستخدم ذات سيولة عالية (60fps) وتكامل فوري مع أنظمة الدفع.",
    img: `${A}973c081bad13681c8162e2f217648a433e938a18?width=1190`,
    deliverables: [
      "بناء معماري Native و Flutter وفق Clean Architecture",
      "معاملات دفع فورية متوافقة مع متطلبات البنك المركزي",
      "أداء فائق مع تجربة مستخدم خالية من التعليق",
    ],
  },
  {
    num: "03",
    t: "بوابات الويب والأنظمة الموزعة",
    badge: "Web Platforms & ZATCA",
    desc: "هندسة بوابات وطنية ومنصات تفاعلية بسرعة استجابة تقل عن 80ms وتوافق مع الفوترة الإلكترونية وتجربة مستخدم لا تضاهى.",
    img: `${A}fbd9df3f42173ba36bb9affe54b57074cc2e88c8?width=1220`,
    deliverables: [
      "واجهات فائقة السرعة مع تقنيات Next.js و SSR",
      "ربط آلي مع منظومة الفوترة الإلكترونية (ZATCA)",
      "أعلى درجات الأمان ومقاومة هجمات DDoS",
    ],
  },
  {
    num: "04",
    t: "حلول الذكاء الاصطناعي وهندسة البيانات",
    badge: "Enterprise AI & RAG",
    desc: "تطوير نماذج ذكاء اصطناعي توليدي مخصصة للقطاعات الحيوية وخطوط تدفق البيانات اللحظية لدعم اتخاذ القرارات التنفيذية.",
    img: `${A}314e6cdd8b0630745c02b043bc6b0892bfce836d?width=960`,
    deliverables: [
      "محركات بحث ذكية ومعالجة لغة عربية متقدمة",
      "مستودعات بيانات لحظية ومعالجة تدفقات Big Data",
      "تشفير وعزل سيادي لبيانات التدريب والتشغيل",
    ],
  },
  {
    num: "05",
    t: "الأمن السيبراني والامتثال السيادي",
    badge: "Cybersecurity & PDPL",
    desc: "تدقيق أمني شامل واختبارات اختراق مستمرة وحماية المنظومات الرقمية الحساسة وفق أطر نظام حماية البيانات الشخصية.",
    img: `${A}99b766d6d2afaf2ff4426215ff837924d331b4bc?width=960`,
    deliverables: [
      "فحص ثغرات شامل واختبارات اختراق Red Team",
      "حوكمة كاملة للامتثال لنظام PDPL وشهادات الأمان",
      "سياسات حماية متقدمة Zero Trust Architecture",
    ],
  },
  {
    num: "06",
    t: "التكامل المؤسسي والربط الحكومي",
    badge: "GovTech & API Gateway",
    desc: "بناء بوابات ربط وسيطة تتيح تكاملاً سلساً وآمناً مع الخدمات الحكومية والمنصات المصرفية ومزودي الخدمات اللوجستية.",
    img: `${A}42226f901ca56075691a54449713463dc3e8f6cc?width=1076`,
    deliverables: [
      "ربط معتمد مع نفاذ، تيسير، سداد، وبلدي",
      "إدارة بوابات الـ API ومراقبة الأداء اللحظي",
      "تزامن لحظي بدون فقدان للحزم مع معمارية Event-Driven",
    ],
  },
];

const work = [
  { tag: "سلاسل الإمداد والخدمات اللوجستية", t: "منصة إدارة حركة الشحن والتوزيع المركزية", img: `${A}99b766d6d2afaf2ff4426215ff837924d331b4bc?width=960` },
  { tag: "التقنية المالية والمصرفية (FinTech)", t: "تطبيق الاستثمار وإدارة المحافظ التلقائية", img: `${A}314e6cdd8b0630745c02b043bc6b0892bfce836d?width=960` },
];

const TEAM_CARDS = [
  "/assets/team/card-2.png",
  "/assets/team/card-1.png",
  "/assets/team/card-3.png",
  "/assets/team/card-4.png",
];

const team = [
  withBase("/assets/team/card-2.png"),
  withBase("/assets/team/card-1.png"),
  withBase("/assets/team/card-3.png"),
  withBase("/assets/team/card-4.png"),
];

const logos = [
  { src: `${A}7c455b8a2426dde7551bb500b3b7cd20c7ae3659?width=604`, cls: "h-[120px] w-[194px]" },
  { src: `${A}37bd4be989ef32e210277b377e519d766d7528b0?width=280`, cls: "h-24 w-24" },
  { src: `${A}f14da5d14ad4d1cfe673d83c288cee3180947d3e?width=424`, cls: "h-32 w-32" },
  { src: `${A}2df2fef59a9e77ac91966aacb46c06d7eaea418e?width=362`, cls: "h-[70px] w-[116px]" },
];

const reviews = [
  { n: "م. تركي القحطاني", r: "مدير عام التحول الرقمي • قطاع حكومي", q: "التزام الفريق البرمجي بمعايير الأمن السيبراني واستضافة البيانات محلياً داخل المملكة كان العامل الحاسم في إطلاق المنصة الوطنية دون أي ثغرة أو انقطاع في الخدمة." },
  { n: "أ. سلطان الراشد", r: "رئيس قطاع التقنية • تقنية مالية (FinTech)", q: "بنيتنا التقنية لمعاملات الدفع والاستثمار تضاعفت كفاءتها بنسبة 40%، وكان زمن الاستجابة أسرع مما خططنا له وفق أعلى متطلبات البنك المركزي." },
  { n: "م. خالد الدوسري", r: "نائب الرئيس للعمليات • سلاسل الإمداد والتوزيع", q: "تحولت عمليات التوزيع والشحن من التتبع اليدوي إلى منصة ذكية مؤتمتة قلصت الهدر التشغيلي وقدمت تقارير لحظية أتاحت لنا اتخاذ قرارات توسعية حاسمة." },
];

const chips = ["منصة مؤسسية سحابية", "تطبيق جوال (iOS / Android)", "ذكاء اصطناعي وأتمتة", "استشارة وهندسة معمارية"];

function scrollToElementId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

const CHECKPOINTS = [
  { id: "hero", label: "الرئيسية" },
  { id: "vision", label: "الرؤية" },
  { id: "industries", label: "القطاعات" },
  { id: "services", label: "خدماتنا" },
  { id: "work", label: "أعمالنا" },
  { id: "team", label: "فريق القيادة" },
  { id: "reviews", label: "الشهادات" },
  { id: "partners", label: "شركاء النجاح" },
  { id: "contact", label: "تواصل معنا" },
];

function SideCheckpoints() {
  const [activeId, setActiveId] = useState("hero");

  useEffect(() => {
    const container = document.querySelector(".agent-native-app-main");
    if (!container) return;

    const sectionElements = CHECKPOINTS.map((cp) => document.getElementById(cp.id)).filter(
      Boolean
    ) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        root: container,
        threshold: 0.4,
      }
    );

    sectionElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      dir="rtl"
      aria-label="فهرس الأقسام"
      className="fixed bottom-5 right-5 z-40 hidden sm:flex flex-col gap-0.5 rounded-2xl bg-white/95 p-1.5 backdrop-blur-md border border-[#CCD6E0] shadow-xl shadow-slate-900/10 w-auto max-w-max transition-all"
    >
      {CHECKPOINTS.map((cp) => {
        const isActive = activeId === cp.id;
        return (
          <button
            key={cp.id}
            onClick={() => scrollToElementId(cp.id)}
            aria-label={cp.label}
            className={`group flex items-center justify-between gap-3 rounded-lg px-2.5 py-1 text-right whitespace-nowrap transition-all duration-200 focus:outline-none ${
              isActive
                ? "bg-[#0284C7] text-white font-bold shadow-sm shadow-sky-600/30"
                : "text-slate-600 hover:text-[#0284C7] hover:bg-sky-50 font-medium"
            }`}
          >
            <span className="font-ar text-[11px] leading-tight">{cp.label}</span>
            <span
              className={`shrink-0 rounded-full transition-all duration-300 ${
                isActive
                  ? "h-1.5 w-1.5 bg-white shadow-sm"
                  : "h-1.5 w-1.5 bg-slate-300 group-hover:bg-[#38BDF8]"
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
}

function Title({
  children,
  sub,
  dark,
  inView = true,
  stage,
}: {
  children: React.ReactNode;
  sub?: string;
  dark?: boolean;
  inView?: boolean;
  stage?: DramaticStage;
}) {
  return (
    <div className="mx-auto max-w-5xl px-4 text-center">
      <h2
        className={`font-ar text-4xl font-extrabold py-2 leading-[1.3] md:text-6xl md:leading-[1.22] md:py-3.5 ${
          dark ? "text-white" : "text-slate-900"
        } ${
          stage !== undefined
            ? "dramatic-headline"
            : `transition-all duration-700 ease-cinematic ${
                inView
                  ? "translate-y-0 opacity-100 scale-100"
                  : "translate-y-6 opacity-0 scale-[0.97]"
              }`
        }`}
      >
        {children}
      </h2>
      {sub && (
        <p
          className={`font-ar mt-4 text-lg text-slate-600 py-1 leading-relaxed md:text-3xl ${
            stage !== undefined
              ? "dramatic-sub"
              : `transition-all duration-700 delay-100 ease-cinematic ${
                  inView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`
          }`}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

function Header({ onOpenDrawer }: { onOpenDrawer: () => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollEl = document.querySelector(".agent-native-app-main") as HTMLElement | null;
      const top = scrollEl ? scrollEl.scrollTop : window.scrollY;
      setScrolled(top > 10);
    };

    // Capture scroll on any container (including .agent-native-app-main)
    document.addEventListener("scroll", handleScroll, { passive: true, capture: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      document.removeEventListener("scroll", handleScroll, { capture: true });
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      dir="rtl"
      className={`fixed inset-x-0 z-50 flex items-center justify-between px-6 transition-all duration-300 md:px-12 ${
        scrolled
          ? "top-0 h-[88px] border-b border-white/20 bg-[#0284C7] shadow-xl shadow-cyan-900/20 backdrop-blur-md md:h-[96px]"
          : "top-[38px] h-[106px] bg-transparent"
      }`}
    >
      {/* Right side in RTL: Menu & Logo */}
      <div className="flex items-center gap-3 md:gap-5">
        <button
          type="button"
          onClick={onOpenDrawer}
          aria-label="فتح القائمة الجانبية"
          className="group flex items-center justify-center rounded-xl p-2 text-white transition hover:bg-white/15 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-400/50"
        >
          <IconMenu2 className="h-7 w-7 text-white transition-transform duration-200 group-hover:scale-110" />
        </button>
        <img
          src={IMG.logo}
          alt="محفز التفكير"
          className="h-[52px] w-[52px] object-contain transition-all md:h-[72px] md:w-[72px]"
        />
      </div>

      {/* Left side in RTL: Search, Toggle, EN, and Primary CTA Button */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Search Bar - changes style on scroll matching Figma 478:5764 vs 478:5792 */}
        <div
          dir="rtl"
          className={`hidden h-[52px] w-[192px] items-center justify-between rounded-full border px-3.5 transition-all lg:flex ${
            scrolled
              ? "border-white/35 bg-white/20 text-white"
              : "border-[#CCD6E0] bg-white text-slate-500"
          }`}
        >
          <span className="font-ar text-xs">بحث...</span>
          <IconSearch className={`h-6 w-6 ${scrolled ? "text-white" : "text-primary"}`} />
        </div>

        {/* Light / Dark Toggle - matching Figma 478:5768 */}
        <div
          className={`hidden h-[43px] w-[84px] items-center justify-between rounded-full border px-[5px] transition-all md:flex ${
            scrolled
              ? "border-white/35 bg-white/20"
              : "border-[#CCD6E0] bg-slate-100"
          }`}
        >
          <span
            className={`flex h-[35px] w-[35px] items-center justify-center rounded-full transition-all ${
              scrolled ? "bg-white text-[#0284C7]" : "bg-primary text-white"
            }`}
          >
            <IconSun className="h-5 w-5" />
          </span>
          <span className="h-6 w-6 rounded-full" />
        </div>

        {/* Language switch */}
        <span
          className="hidden text-[13px] font-semibold text-white md:inline"
          style={{ fontFamily: "Geist, sans-serif" }}
        >
          EN
        </span>

        {/* Primary CTA button at outer edge: "تحدث معنا ←" */}
        <button
          onClick={() => scrollToElementId("contact")}
          className={`font-ar inline-flex h-[51px] items-center justify-center rounded-full px-6 text-base font-bold shadow-md ${
            scrolled
              ? "btn-tactile-white bg-white text-[#0284C7] hover:bg-slate-50"
              : "btn-tactile bg-primary text-white border border-white/20"
          }`}
        >
          <span>تحدث معنا</span>
          <span className="btn-arrow ms-1.5 inline-block">←</span>
        </button>
      </div>
    </header>
  );
}

function Hero() {
  const [ref, stage, inView, isIntersecting] = useDramaticStage<HTMLDivElement>({
    threshold: 0.25,
    initialInView: true,
  });
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const isInitialMount = useRef(true);

  // Initial setup: ensure silent / muted
  useEffect(() => {
    const video = heroVideoRef.current;
    if (video) {
      video.muted = true;
      video.volume = 0;
      if (video.readyState >= 2) {
        setIsVideoReady(true);
      }
    }
  }, []);

  // Replay hero video once scrolled to
  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;

    if (isIntersecting) {
      // If returning to Hero after having scrolled away, replay from beginning
      if (!isInitialMount.current) {
        video.currentTime = 0;
      }
      isInitialMount.current = false;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          video.muted = true;
          video.play().catch(() => {});
        });
      }
    } else {
      video.pause();
    }
  }, [isIntersecting]);

  return (
    <section
      id="hero"
      ref={ref}
      data-stage={stage}
      className="dramatic-stage relative flex h-screen min-h-[720px] w-full snap-start snap-always shrink-0 flex-col items-center justify-end overflow-hidden bg-slate-950 pb-4 md:pb-6 pt-[96px]"
    >
      <LaserHorizon />
      <SpatialVoidFlare intense />
      <SectionTelemetry code="SEC-01" label="SOVEREIGN_CORE // RIYADH" />

      <div className="font-ar absolute inset-x-0 top-0 z-40 flex h-[38px] items-center justify-center bg-[#004E77] px-4 text-center text-[11px] font-bold text-slate-50">
        إعلان: إطلاق محرك راصد والحلول السيادية للقطاعات الحكومية في المملكة
        <button
          onClick={() => scrollToElementId("vision")}
          className="ms-4 font-bold text-sky-200 underline transition hover:text-white"
        >
          عرض التفاصيل ←
        </button>
      </div>

      {/* Shimmering Glow Loading Indicator for Hero Video (active before video loads) */}
      <div
        className={`pointer-events-none absolute inset-0 z-10 transition-opacity duration-1000 ${
          !isVideoReady ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="hero-loading-glow absolute inset-0" />
      </div>

      <video
        ref={heroVideoRef}
        src={withBase("/videos/hero.mp4")}
        autoPlay
        muted
        playsInline
        preload="auto"
        onLoadedData={() => setIsVideoReady(true)}
        onCanPlay={() => setIsVideoReady(true)}
        onPlaying={() => setIsVideoReady(true)}
        className={`absolute inset-0 h-full w-full object-cover will-change-[filter,opacity,transform] transition-all duration-1200 ease-cinematic ${
          isVideoReady && isIntersecting
            ? "opacity-100 blur-none scale-100"
            : !isIntersecting
            ? "opacity-35 blur-md scale-105"
            : "opacity-0 blur-2xl scale-108"
        }`}
        onEnded={(e) => {
          e.currentTarget.pause();
        }}
      />
      {/* Dramatic ambient vignette & radial spotlight */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/80" />
      <div
        className={`pointer-events-none absolute inset-0 transition-opacity duration-1000 ease-cinematic ${
          isIntersecting ? "opacity-100" : "opacity-0"
        } cinematic-glow-intense`}
      />

      {/* FluxLines Layer - full hero coverage in pure white; header and text overlying it */}
      <div className="pointer-events-none absolute inset-0 z-[5] h-full w-full overflow-hidden">
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
          <FluxLines
            colors={["#ffffff", "#ffffff", "#ffffff"]}
            glow={2}
            rimWidth={0.17}
            lineWidth={1}
            flowDirection="down"
            mouseInteraction
            clickSwirl
            speed={0.5}
            scale={1.6}
            turbulence={1}
            fluidity={0.1}
            sharpness={2.5}
            shimmer={1.5}
            mouseStrength={1}
            mouseRadius={0.35}
            intro
            lightMode={false}
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-4 pb-2 text-center md:pb-4">
        <div className="dramatic-headline relative mx-auto w-full max-w-[1200px] h-[75px] sm:h-[90px] md:h-[110px] lg:h-[125px] py-1">
          <h1 className="sr-only">نطور أنظمة رقمية تقود مستقبل أعمالك</h1>
          <TechText
            text="نطور أنظمة رقمية تقود مستقبل أعمالك"
            fontFamily="'Almarai', sans-serif"
            fontWeight={800}
            fontSize={64}
            color="#FFFFFF"
            accentColor="#38BDF8"
            align="center"
            reveal="letter"
            dashLength={4}
            dashGap={2}
            strokeWidth={1.5}
            lineStyle="dashed"
            specks={15}
            intro="none"
            introDuration={2}
            clickKick
            guides={false}
            letterSpacing={0}
            reach={160}
            softness={0.7}
            speed={1}
            bounce={0.4}
            selection
            labels
            draggable
            sweep
          />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-sky-400/60 to-transparent" />
        </div>
        <p className="dramatic-sub font-ar mx-auto mt-2 max-w-[1153px] text-lg leading-[1.3] text-slate-200 drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] md:text-[30px]">
          شريككم الهندسي لتطوير المنصات المؤسسية وتطبيقات الجوال والذكاء الاصطناعي وفق أعلى معايير الأمان والسرعة وحفظ البيانات محلياً.
        </p>
      </div>
    </section>
  );
}

function IconPlaySvg({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M7 4.5v15a1 1 0 0 0 1.524 .852l12 -7.5a1 1 0 0 0 0 -1.704l-12 -7.5a1 1 0 0 0 -1.524 .852z" />
    </svg>
  );
}

function IconPauseSvg({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M6 5a1 1 0 0 1 1 1v12a1 1 0 0 1 -2 0v-12a1 1 0 0 1 1 -1zm12 0a1 1 0 0 1 1 1v12a1 1 0 0 1 -2 0v-12a1 1 0 0 1 1 -1z" />
    </svg>
  );
}

function IconVolumeSvg({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  );
}

function IconVolumeOffSvg({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  );
}

const VISION_VIDEO_DATA = [
  { step: 0, title: "الرؤية", subtitle: "رؤية محفز التفكير السيادية", path: "/videos/vision-1.mp4" },
  { step: 1, title: "المهمة", subtitle: "مهمة بناء المنصات المؤسسية", path: "/videos/vision-2.mp4" },
  { step: 2, title: "الهدف", subtitle: "هدف السيادة والريادة التقنية", path: "/videos/vision-3.mp4" },
];

function Vision() {
  const [ref, stage, inView] = useDramaticStage<HTMLDivElement>({ threshold: 0.25 });
  const [step, setStep] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  const visionVideos = VISION_VIDEO_DATA.map((v) => ({
    ...v,
    src: withBase(v.path),
  }));

  const bodies = [
    "انطلقت محفز التفكير برؤية حاسمة تهدف لتسليم شفرات برمجية نقية ومملوكة للمنشأة بنسبة 100%، وتوطين كامل البيانات والعمليات الحيوية داخل مراكز بيانات المملكة مع الامتثال الصارم لضوابط NCA وPDPL.",
    "مهمتنا بناء منصات مؤسسية آمنة وقابلة للتوسع تخدم القطاعات الوطنية الحيوية بأعلى معايير الجودة.",
    "هدفنا أن نكون الشريك الهندسي الأول للسيادة الرقمية في المملكة العربية السعودية.",
  ];
  const heads = ["الرؤية", "المهمة", "الهدف"];

  const handleStepTransition = useCallback(
    (targetStep: number) => {
      if (targetStep === step || isFading) return;
      setIsVideoLoading(true);
      setIsFading(true);
      setTimeout(() => {
        setStep(targetStep);
        setIsFading(false);
      }, 200);
    },
    [step, isFading]
  );

  const handleNextStep = useCallback(() => {
    const next = (step + 1) % 3;
    handleStepTransition(next);
  }, [step, handleStepTransition]);

  // Play video reliably when scrolled to (inView is true), pause when scrolled away
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (inView) {
      if (hasUserInteracted) {
        video.muted = false;
        video.volume = 1.0;
      } else {
        video.muted = true;
      }

      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setIsMuted(video.muted);
          })
          .catch(() => {
            // Autoplay with audio was rejected by browser policy.
            // Fall back immediately to muted playback so the video plays visually without interruption
            video.muted = true;
            setIsMuted(true);
            video.play()
              .then(() => setIsPlaying(true))
              .catch(() => setIsPlaying(false));
          });
      }
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, [step, inView, hasUserInteracted]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    setHasUserInteracted(true);
    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {
        video.muted = true;
        setIsMuted(true);
        video.play();
      });
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    setHasUserInteracted(true);
    if (video.muted) {
      video.muted = false;
      video.volume = 1.0;
      setIsMuted(false);
      video.play().catch(() => {});
    } else {
      video.muted = true;
      setIsMuted(true);
    }
  };

  return (
    <section
      id="vision"
      ref={ref}
      data-stage={stage}
      className="dramatic-stage relative flex h-screen min-h-[720px] w-full snap-start snap-always shrink-0 flex-col items-center justify-center overflow-hidden bg-white pb-6 pt-[96px]"
    >
      <LaserHorizon />
      <SpatialVoidFlare />
      <SectionTelemetry code="SEC-02" label="VISION_AND_PURPOSE" />

      {/* Ambient Radial Spotlight */}
      <div
        className={`pointer-events-none absolute inset-0 transition-opacity duration-1000 ease-cinematic ${
          inView ? "opacity-100" : "opacity-0"
        } cinematic-glow`}
      />
      <ElectricCircuit inView={inView} />
      {/* RTL: Text on the RIGHT (first child), Image Mockup on the LEFT (second child) */}
      <div className="relative mx-auto flex w-full max-w-[1440px] items-center justify-between gap-10 px-6 lg:flex-row lg:px-16">
        {/* Right Column: Stepper and Text */}
        <div className="flex w-full items-center gap-8 md:gap-12 lg:gap-14 lg:w-auto lg:flex-1 lg:justify-start">
          <div className="delaminate-card delaminate-stagger-1 relative flex flex-col justify-between items-center h-[340px] md:h-[360px] w-[68px] md:w-[78px] shrink-0">
            {/* Solid connector spine line sticking exactly from circle 0 to circle 2 */}
            <div className="absolute top-[34px] bottom-[34px] md:top-[38px] md:bottom-[38px] w-0.5 bg-[#CCD6E0] z-0" />
            {steps.map((s, i) => {
              const isActive = i === step;
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => handleStepTransition(i)}
                  className={`font-ar relative z-10 flex h-[68px] w-[68px] md:h-[76px] md:w-[76px] flex-col items-center justify-center rounded-full text-center transition-all duration-300 active:scale-95 cursor-pointer ${
                    isActive
                      ? "bg-[#0284C7] text-white border-2 border-white scale-110 shadow-[0_0_28px_rgba(2,132,199,0.55)] ring-4 ring-sky-400/35"
                      : "bg-white text-slate-700 border-2 border-[#CCD6E0] hover:border-[#0284C7] hover:text-[#0284C7] hover:scale-105 shadow-sm"
                  }`}
                >
                  <span
                    className={`text-[10px] font-mono font-bold leading-none ${
                      isActive ? "text-sky-200" : "text-slate-400"
                    }`}
                  >
                    0{i + 1}
                  </span>
                  <span className="font-ar text-xs md:text-sm font-bold mt-0.5">
                    {heads[i]}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="flex-1 text-right pr-6 md:pr-10 lg:pr-14 transition-all duration-300 ease-out lg:max-w-[580px]">
            <div
              className={`transition-all duration-200 ease-out ${
                isFading
                  ? "opacity-0 -translate-y-2 scale-[0.99]"
                  : "opacity-100 translate-y-0 scale-100"
              }`}
            >
              <h2 className="dramatic-headline font-ar text-5xl font-extrabold text-slate-900 py-2 md:py-4 leading-[1.25] md:text-[96px] md:leading-[1.18]">
                {heads[step]}
              </h2>
              <p className="dramatic-sub font-ar mt-4 text-lg font-bold leading-[1.4] text-slate-600 py-1 md:text-[26px]">
                {bodies[step]}
              </p>
            </div>
            <div className="tactile-snap">
              <button
                type="button"
                onClick={handleNextStep}
                className={`${btn} mt-6 h-16 px-8 text-2xl`}
              >
                <span>{step === 2 ? "العودة للرؤية" : "اعرف اكثر"}</span>
                <span className="btn-arrow ms-2 inline-block">{step === 2 ? "↺" : "←"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Left Column: Interactive Video Card with Play/Pause button */}
        <div className="delaminate-card delaminate-stagger-2 specular-glint-active w-full max-w-[480px] shrink-0 rounded-[20px] border border-[#CCD6E0] bg-white p-4 shadow-[0_30px_70px_-12px_rgba(2,132,199,0.3),0_0_40px_rgba(56,189,248,0.15)] ring-1 ring-sky-400/30 md:max-w-[520px] md:p-5">
          <div className="flex h-9 items-center justify-between px-1.5">
            <span
              className={`font-ar text-[12px] font-bold text-slate-600 transition-opacity duration-200 ${
                isFading ? "opacity-0" : "opacity-100"
              }`}
            >
              {visionVideos[step].subtitle}
            </span>
            {/* macOS Window Traffic Dots - Enlarged to 12px (h-3 w-3) */}
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#FF5F56] border border-black/10 shadow-xs transition-transform hover:scale-115" />
              <span className="h-3 w-3 rounded-full bg-[#FFBD2E] border border-black/10 shadow-xs transition-transform hover:scale-115" />
              <span className="h-3 w-3 rounded-full bg-[#27C93F] border border-black/10 shadow-xs transition-transform hover:scale-115" />
            </div>
          </div>

          <div
            className={`group relative mt-2 aspect-[509/480] overflow-hidden rounded-[14px] border border-[#CCD6E0] bg-slate-950 transition-opacity duration-200 ${
              isFading ? "opacity-0" : "opacity-100"
            }`}
          >
            {/* Shimmering Loading State Indicator for Vision Video */}
            <div
              className={`pointer-events-none absolute inset-0 z-10 overflow-hidden transition-opacity duration-500 ${
                isVideoLoading ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm" />
              <div className="video-shimmer-sweep absolute inset-0" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex items-center gap-2 rounded-full border border-sky-400/30 bg-slate-900/80 px-3.5 py-1.5 shadow-[0_0_24px_rgba(2,132,199,0.35)] backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-500" />
                  </span>
                  <span className="font-ar text-[11px] font-bold text-sky-200">جاري المعالجة...</span>
                </div>
              </div>
            </div>

            <video
              ref={videoRef}
              key={visionVideos[step].src}
              src={visionVideos[step].src}
              playsInline
              preload="auto"
              loop
              className={`h-full w-full object-cover object-center will-change-[filter,opacity,transform] transition-all duration-700 ease-cinematic ${
                isVideoLoading
                  ? "opacity-35 blur-xl scale-104"
                  : "opacity-100 blur-none scale-100"
              }`}
              onLoadStart={() => setIsVideoLoading(true)}
              onLoadedData={() => setIsVideoLoading(false)}
              onCanPlay={() => setIsVideoLoading(false)}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
            />

            {/* Play / Pause Interactive Overlay Button */}
            <div
              onClick={togglePlay}
              className={`absolute inset-0 flex cursor-pointer items-center justify-center transition-all duration-300 ${
                isPlaying
                  ? "bg-black/0 opacity-0 group-hover:bg-black/25 group-hover:opacity-100"
                  : "bg-black/45 opacity-100"
              }`}
            >
              <button
                type="button"
                aria-label={isPlaying ? "إيقاف مؤقت" : "تشغيل الفيديو"}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/95 text-white shadow-2xl shadow-sky-600/50 backdrop-blur-md border border-white/40 transition-transform duration-300 hover:scale-110 active:scale-95 md:h-20 md:w-20"
              >
                {isPlaying ? (
                  <IconPauseSvg className="h-7 w-7 text-white" />
                ) : (
                  <IconPlaySvg className="h-8 w-8 translate-x-0.5 text-white" />
                )}
              </button>
            </div>

            {/* Stage bottom info bar with Sound Toggle */}
            <div className="absolute bottom-2.5 inset-x-2.5 flex items-center justify-between rounded-lg bg-black/60 px-3 py-1.5 text-white backdrop-blur-md border border-white/10 z-20">
              <span className="font-ar flex items-center gap-1.5 text-[11px] font-bold">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    isPlaying ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
                  }`}
                />
                {heads[step]}
              </span>
              <button
                type="button"
                onClick={toggleSound}
                className="font-ar text-[11px] text-slate-200 hover:text-white flex items-center gap-1.5 cursor-pointer bg-white/10 hover:bg-white/20 px-2.5 py-0.5 rounded transition"
              >
                {isMuted ? (
                  <>
                    <IconVolumeOffSvg className="h-3.5 w-3.5 text-amber-400" />
                    <span>انقر لتشغيل الصوت</span>
                  </>
                ) : (
                  <>
                    <IconVolumeSvg className="h-3.5 w-3.5 text-sky-400" />
                    <span>جاري التشغيل بالصوت</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Industries() {
  const [ref, stage, inView] = useDramaticStage<HTMLDivElement>({ threshold: 0.25 });
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [indicatorTop, setIndicatorTop] = useState(36);
  const tileRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lastScrollTime = useRef(0);
  const touchStartY = useRef<number | null>(null);

  const changeActive = useCallback(
    (nextIdx: number) => {
      if (nextIdx === activeIdx) return;
      setIsFading(true);
      setTimeout(() => {
        setActiveIdx(nextIdx);
        setIsFading(false);
      }, 150);
    },
    [activeIdx]
  );

  // Auto-rotation every 5 seconds (5000ms), paused on hover
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      changeActive((activeIdx + 1) % industries.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [activeIdx, isPaused, changeActive]);

  // Keep the spine active indicator aligned with the active tile
  useEffect(() => {
    const updateIndicator = () => {
      const el = tileRefs.current[activeIdx];
      if (el) {
        setIndicatorTop(el.offsetTop + el.offsetHeight / 2 - 12);
      }
    };
    updateIndicator();
    const timeout = setTimeout(updateIndicator, 50);
    return () => clearTimeout(timeout);
  }, [activeIdx]);

  // Responsive scroll navigation over the departments
  const handleWheel = (e: React.WheelEvent) => {
    if (Math.abs(e.deltaY) < 25) return;
    const now = Date.now();
    if (now - lastScrollTime.current < 280) return;
    lastScrollTime.current = now;

    if (e.deltaY > 0) {
      changeActive((activeIdx + 1) % industries.length);
    } else {
      changeActive((activeIdx - 1 + industries.length) % industries.length);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const deltaY = touchStartY.current - e.changedTouches[0].clientY;
    touchStartY.current = null;
    if (Math.abs(deltaY) < 30) return;

    if (deltaY > 0) {
      changeActive((activeIdx + 1) % industries.length);
    } else {
      changeActive((activeIdx - 1 + industries.length) % industries.length);
    }
  };

  const activeItem = industries[activeIdx];
  const ActiveIcon = activeItem.icon;

  return (
    <section
      id="industries"
      ref={ref}
      data-stage={stage}
      className="dramatic-stage relative flex h-screen min-h-[720px] w-full snap-start snap-always shrink-0 flex-col items-center justify-center overflow-hidden border-t border-slate-200 bg-slate-50 pb-6 pt-[96px]"
    >
      <LaserHorizon />
      <SpatialVoidFlare />
      <SectionTelemetry code="SEC-03" label="STRATEGIC_INDUSTRIES" />

      {/* Ambient Spotlight */}
      <div
        className={`pointer-events-none absolute inset-0 transition-opacity duration-1000 ease-cinematic ${
          inView ? "opacity-100" : "opacity-0"
        } cinematic-glow`}
      />
      <ElectricCircuit inView={inView} />

      {/* RTL: Text on the RIGHT (first child), Carousel tiles on the LEFT (second child) */}
      <div className="relative mx-auto flex w-full max-w-[1440px] items-center justify-between gap-10 px-6 lg:flex-row lg:px-16">
        {/* Right Column: Title, Subtitle, Contextual Dynamic Card, CTA */}
        <div className="flex w-full flex-col text-right lg:max-w-[580px]">
          <h2 className="dramatic-headline font-ar text-5xl font-extrabold text-slate-900 py-2 md:py-4 leading-[1.25] md:text-[96px] md:leading-[1.18]">
            القطاعات
          </h2>
          <p className="dramatic-sub font-ar mt-4 text-base font-bold leading-relaxed text-slate-600 py-1 md:text-[22px]">
            حلول برمجية سيادية مصممة خصيصاً لتلبية المتطلبات التشغيلية والأمنية الحساسة في كبرى القطاعات الوطنية.
          </p>

          {/* Dynamic Contextual Box with Hover, Press, Color shift, Scale-up & Glow shadow */}
          <div
            onClick={() => scrollToElementId("services")}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                scrollToElementId("services");
              }
            }}
            className="delaminate-card delaminate-stagger-1 group/infocard mt-5 min-h-[148px] cursor-pointer rounded-2xl border border-[#CCD6E0] bg-white/90 p-5 shadow-sm backdrop-blur-sm transition-all duration-300 ease-out select-none hover:-translate-y-1 hover:scale-[1.02] hover:border-primary hover:bg-gradient-to-br hover:from-white hover:to-sky-50/70 hover:shadow-2xl hover:shadow-sky-500/20 hover:ring-2 hover:ring-sky-400/25 active:scale-[0.98] active:shadow-md active:bg-sky-50/80"
          >
            <div
              className={`transition-all duration-300 ease-out ${
                isFading
                  ? "opacity-0 -translate-y-2"
                  : "opacity-100 translate-y-0"
              }`}
            >
              {/* Department Title + Standalone Enlarged Icon with hover color & scale shift */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <ActiveIcon className="h-10 w-10 shrink-0 text-primary transition-all duration-300 group-hover/infocard:scale-110 group-hover/infocard:text-sky-600" />
                  <h3 className="font-ar text-2xl font-extrabold text-slate-900 transition-colors duration-300 group-hover/infocard:text-primary md:text-3xl">
                    {activeItem.title}
                  </h3>
                </div>

                {/* Subtle Interactive Action Indicator */}
                <span className="font-ar hidden items-center gap-1 text-xs font-bold text-primary opacity-0 transition-all duration-300 group-hover/infocard:opacity-100 sm:flex">
                  عرض الحلول ←
                </span>
              </div>

              <p className="font-ar mt-3 text-sm leading-relaxed text-slate-600 transition-colors duration-300 group-hover/infocard:text-slate-800 md:text-base">
                {activeItem.desc}
              </p>
            </div>
          </div>

          <div className="tactile-snap">
            <button
              onClick={() => scrollToElementId("services")}
              className={`${btn} mt-6 h-16 w-fit px-8 text-2xl`}
            >
              <span>استكشف القطاعات</span>
              <span className="btn-arrow ms-2 inline-block">←</span>
            </button>
          </div>
        </div>

        {/* Left Column: Vertical Carousel Wheel with scrolling bar on the LEFT of the cards */}
        <div
          className="delaminate-card delaminate-stagger-2 relative flex w-full max-w-[540px] flex-col gap-3.5 pe-8 ps-1"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Vertical Spine on the LEFT of the cards with perfectly centered indicator */}
          <div className="absolute inset-y-2 left-0 z-10 flex w-3 justify-center pointer-events-none">
            {/* The Vertical Line (2px width, #CCD6E0) */}
            <div className="h-full w-[2px] bg-[#CCD6E0]" />

            {/* Centered Scrolling Dot/Pill */}
            <div
              className="absolute h-6 w-2.5 rounded-full bg-primary shadow-md shadow-sky-500/40 transition-all duration-300 ease-out"
              style={{ top: `${indicatorTop}px` }}
            />
          </div>

          {industries.map((item, idx) => {
            const isActive = idx === activeIdx;
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                ref={(el) => {
                  tileRefs.current[idx] = el;
                }}
                onClick={() => changeActive(idx)}
                onMouseEnter={() => changeActive(idx)}
                className={`group flex cursor-pointer items-center justify-between gap-4 border border-[#CCD6E0] px-5 transition-all duration-300 ease-out select-none ${
                  isActive
                    ? "h-[148px] w-full max-w-[510px] rounded-[32px] bg-primary text-white shadow-xl shadow-sky-600/30 ring-1 ring-white/30"
                    : "h-[102px] w-full max-w-[420px] rounded-[28px] bg-white text-slate-800 hover:border-sky-300 hover:bg-slate-50/80"
                } ${
                  inView
                    ? "translate-x-0 opacity-100 scale-100"
                    : "translate-x-8 opacity-0 scale-[0.96]"
                }`}
              >
                {/* Icon Box (Matching Figma: White on Active, Blue on Inactive) */}
                <span
                  className={`flex shrink-0 items-center justify-center border transition-all duration-300 ${
                    isActive
                      ? "h-[104px] w-[107px] rounded-2xl bg-white border-[#38BDF8] text-[#0284C7] shadow-md ring-2 ring-white/40"
                      : "h-[74px] w-[76px] rounded-xl bg-primary border-[#38BDF8] text-white"
                  }`}
                >
                  <Icon className={isActive ? "h-16 w-16" : "h-9 w-9"} />
                </span>

                {/* Tile Title */}
                <span
                  className={`font-ar flex-1 text-right font-bold transition-all duration-300 ${
                    isActive
                      ? "text-2xl md:text-[34px] text-white"
                      : "text-xl md:text-[26px] text-slate-800 group-hover:text-primary"
                  }`}
                >
                  {item.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Services() {
  const [ref, stage, inView] = useDramaticStage<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section
      id="services"
      ref={ref}
      data-stage={stage}
      className="dramatic-stage relative flex h-screen min-h-[720px] w-full snap-start snap-always shrink-0 flex-col items-center justify-center overflow-hidden bg-white pb-6 pt-[96px]"
    >
      <LaserHorizon />
      <SpatialVoidFlare />
      <SectionTelemetry code="SEC-04" label="ENGINEERING_CAPABILITIES" />

      {/* Ambient Radial Spotlight */}
      <div
        className={`pointer-events-none absolute inset-0 transition-opacity duration-1000 ease-cinematic ${
          inView ? "opacity-100" : "opacity-0"
        } cinematic-glow`}
      />
      <ElectricCircuit inView={inView} />
      <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center px-4 text-center">
        <Title
          inView={inView}
          stage={stage}
          sub="كل بطاقة تمثل ركيزة هندسية ثلاثية الأبعاد تتكشف بتفاعل فيزيائي وقابلة للقلب لاستكشاف مخرجاتها التقنية."
        >
          خدماتنا
        </Title>
      </div>

      {/* Infinite Horizontal Continuous Marquee Track */}
      <div
        className="delaminate-card delaminate-stagger-2 relative mt-4 w-full overflow-hidden marquee-fade-mask py-2"
        dir="ltr"
      >
        <div className="animate-services-marquee">
          {/* Sub-track 1 */}
          <div className="flex shrink-0 items-center gap-6 pe-6">
            {services.map((item, idx) => (
              <div key={`s1-${item.num}-${idx}`} dir="rtl" className="shrink-0">
                <TiltedCard
                  containerWidth="480px"
                  containerHeight="320px"
                  imageWidth="480px"
                  imageHeight="320px"
                  rotateAmplitude={12}
                  scaleOnHover={1.04}
                  glare={0.35}
                  glareColor="#38BDF8"
                  shadow={0.4}
                  radius={20}
                  perspective={900}
                  intro={false}
                  backContent={
                    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[20px] border-[1.5px] border-white/35 bg-gradient-to-br from-[#0284C7] via-[#0279B8] to-[#0369A1] p-5 text-right text-white select-none shadow-[0_20px_50px_-8px_rgba(2,132,199,0.55),0_0_35px_rgba(56,189,248,0.3)]">
                      {/* Ambient Specular Highlight */}
                      <div className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-white/20 blur-2xl" />
                      <div className="pointer-events-none absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-sky-300/15 blur-2xl" />

                      <div className="relative z-10">
                        <div className="flex items-center justify-between border-b border-white/25 pb-2.5">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-white bg-white/20 px-2 py-0.5 rounded-md shadow-xs">
                              [{item.num}]
                            </span>
                            <h4 className="font-ar text-[15px] font-bold text-white leading-tight">
                              {item.t}
                            </h4>
                          </div>
                          <span className="font-ar text-[11px] font-semibold text-white/90 bg-white/15 hover:bg-white/25 px-2.5 py-0.5 rounded-md transition">
                            العودة ↺
                          </span>
                        </div>
                        <p className="font-ar mt-2.5 text-xs font-semibold text-sky-100">
                          مخرجات ومواصفات التسليم الهندسي:
                        </p>
                        <ul className="mt-2 space-y-1.5">
                          {item.deliverables.map((del, dIdx) => (
                            <li key={dIdx} className="font-ar flex items-start gap-2 text-xs text-white">
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
                              <span className="leading-snug font-medium text-white/95">{del}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="relative z-10 pt-2.5 border-t border-white/25 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            scrollToElementId("contact");
                          }}
                          className="font-ar rounded-lg bg-white px-4 py-1.5 text-center text-xs font-bold text-[#0284C7] shadow-lg shadow-sky-950/20 transition hover:bg-sky-50 active:scale-95 cursor-pointer"
                        >
                          طلب استشارة للخدمة ←
                        </button>
                        <span className="font-ar text-[10px] text-sky-100/80">
                          انقر في أي مكان للقلب ↺
                        </span>
                      </div>
                    </div>
                  }
                >
                  <div className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[20px] border-[1.5px] border-primary bg-white p-5 text-right select-none shadow-[0_16px_32px_-4px_rgba(3,133,199,0.18)]">
                    {/* Top: Title & Num (Matching previous layout) */}
                    <div className="flex items-center justify-between">
                      <h3 className="font-ar text-right text-[17px] font-bold text-slate-900 leading-snug">
                        {item.t}
                      </h3>
                      <span className="font-mono text-xs font-bold text-slate-400 shrink-0">
                        [{item.num}]
                      </span>
                    </div>

                    {/* Middle: Visual Preview (Matching previous layout) */}
                    <div className="my-2.5 h-[190px] w-full overflow-hidden rounded-xl border border-[#CCD6E0] bg-slate-50">
                      <img
                        src={item.img}
                        alt={item.t}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>

                    {/* Bottom: Action link & flip hint (Matching previous layout) */}
                    <div className="flex items-center justify-between">
                      <p className="font-ar text-right text-[13px] font-bold text-primary">
                        استكشف تفاصيل الخدمة والمعمارية ←
                      </p>
                      <span className="font-ar text-[11px] text-slate-400">
                        انقر للقلب ↺
                      </span>
                    </div>
                  </div>
                </TiltedCard>
              </div>
            ))}
          </div>

          {/* Sub-track 2 (Identical Clone for Seamless Infinite Loop) */}
          <div className="flex shrink-0 items-center gap-6 pe-6" aria-hidden="true">
            {services.map((item, idx) => (
              <div key={`s2-${item.num}-${idx}`} dir="rtl" className="shrink-0">
                <TiltedCard
                  containerWidth="480px"
                  containerHeight="320px"
                  imageWidth="480px"
                  imageHeight="320px"
                  rotateAmplitude={12}
                  scaleOnHover={1.04}
                  glare={0.35}
                  glareColor="#38BDF8"
                  shadow={0.4}
                  radius={20}
                  perspective={900}
                  intro={false}
                  backContent={
                    <div className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[20px] border-[1.5px] border-white/35 bg-gradient-to-br from-[#0284C7] via-[#0279B8] to-[#0369A1] p-5 text-right text-white select-none shadow-[0_20px_50px_-8px_rgba(2,132,199,0.55),0_0_35px_rgba(56,189,248,0.3)]">
                      {/* Ambient Specular Highlight */}
                      <div className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-white/20 blur-2xl" />
                      <div className="pointer-events-none absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-sky-300/15 blur-2xl" />

                      <div className="relative z-10">
                        <div className="flex items-center justify-between border-b border-white/25 pb-2.5">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-white bg-white/20 px-2 py-0.5 rounded-md shadow-xs">
                              [{item.num}]
                            </span>
                            <h4 className="font-ar text-[15px] font-bold text-white leading-tight">
                              {item.t}
                            </h4>
                          </div>
                          <span className="font-ar text-[11px] font-semibold text-white/90 bg-white/15 hover:bg-white/25 px-2.5 py-0.5 rounded-md transition">
                            العودة ↺
                          </span>
                        </div>
                        <p className="font-ar mt-2.5 text-xs font-semibold text-sky-100">
                          مخرجات ومواصفات التسليم الهندسي:
                        </p>
                        <ul className="mt-2 space-y-1.5">
                          {item.deliverables.map((del, dIdx) => (
                            <li key={dIdx} className="font-ar flex items-start gap-2 text-xs text-white">
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
                              <span className="leading-snug font-medium text-white/95">{del}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="relative z-10 pt-2.5 border-t border-white/25 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            scrollToElementId("contact");
                          }}
                          className="font-ar rounded-lg bg-white px-4 py-1.5 text-center text-xs font-bold text-[#0284C7] shadow-lg shadow-sky-950/20 transition hover:bg-sky-50 active:scale-95 cursor-pointer"
                        >
                          طلب استشارة للخدمة ←
                        </button>
                        <span className="font-ar text-[10px] text-sky-100/80">
                          انقر في أي مكان للقلب ↺
                        </span>
                      </div>
                    </div>
                  }
                >
                  <div className="relative flex h-full w-full flex-col justify-between overflow-hidden rounded-[20px] border-[1.5px] border-primary bg-white p-5 text-right select-none shadow-[0_16px_32px_-4px_rgba(3,133,199,0.18)]">
                    {/* Top: Title & Num (Matching previous layout) */}
                    <div className="flex items-center justify-between">
                      <h3 className="font-ar text-right text-[17px] font-bold text-slate-900 leading-snug">
                        {item.t}
                      </h3>
                      <span className="font-mono text-xs font-bold text-slate-400 shrink-0">
                        [{item.num}]
                      </span>
                    </div>

                    {/* Middle: Visual Preview (Matching previous layout) */}
                    <div className="my-2.5 h-[190px] w-full overflow-hidden rounded-xl border border-[#CCD6E0] bg-slate-50">
                      <img
                        src={item.img}
                        alt={item.t}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>

                    {/* Bottom: Action link & flip hint (Matching previous layout) */}
                    <div className="flex items-center justify-between">
                      <p className="font-ar text-right text-[13px] font-bold text-primary">
                        استكشف تفاصيل الخدمة والمعمارية ←
                      </p>
                      <span className="font-ar text-[11px] text-slate-400">
                        انقر للقلب ↺
                      </span>
                    </div>
                  </div>
                </TiltedCard>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className={`mt-4 text-center transition-all duration-700 delay-250 ease-cinematic ${
          inView ? "translate-y-0 opacity-100 scale-100" : "translate-y-4 opacity-0 scale-95"
        }`}
      >
        <button
          onClick={() => scrollToElementId("contact")}
          className={`${btn} h-16 px-8 text-2xl`}
        >
          <span>كيف لنا أن نخدمك؟</span>
          <span className="btn-arrow ms-2 inline-block">←</span>
        </button>
      </div>
    </section>
  );
}

function Work() {
  const [ref, stage, inView] = useDramaticStage<HTMLDivElement>({ threshold: 0.25 });

  return (
    <section
      id="work"
      ref={ref}
      data-stage={stage}
      className="dramatic-stage relative flex h-screen min-h-[720px] w-full snap-start snap-always shrink-0 flex-col items-center justify-center overflow-hidden bg-slate-50 pb-6 pt-[96px]"
    >
      <LaserHorizon />
      <SpatialVoidFlare />
      <SectionTelemetry code="SEC-05" label="CASE_STUDIES_AND_IMPACT" />

      <div
        className={`pointer-events-none absolute inset-0 transition-opacity duration-1000 ease-cinematic ${
          inView ? "opacity-100" : "opacity-0"
        } cinematic-glow`}
      />
      <ElectricCircuit inView={inView} />
      <div className="relative mx-auto flex w-full max-w-[1200px] flex-col items-center px-4">
        <Title
          inView={inView}
          stage={stage}
          sub="منصات وطنية أحدثت فارقاً تشغيلياً وتجارياً حقيقياً في السوق السعودي."
        >
          أعمالنا وأثرنا الموثق بالأرقام
        </Title>
        <div className="mx-auto mt-8 flex w-full max-w-[1100px] flex-wrap justify-center gap-6 px-4">
          {work.map((w, idx) => (
            <div
              key={w.t}
              className={`delaminate-card ${
                idx === 0 ? "delaminate-stagger-1" : "delaminate-stagger-2"
              } w-full max-w-[480px] shrink-0`}
            >
              <ReflectiveCard
                videoSrc={withBase("/videos/hero.mp4")}
                webcam={false}
                tint="#0284c7"
                metalness={0.6}
                roughness={0.25}
                blurStrength={6}
                shine={1.2}
                glare={0.6}
                grayscale={1}
                warp={0.5}
                warpScale={1}
                bevel={3}
                tiltStrength={12}
                radius={24}
                enableTilt
                intro
                theme="light"
                width="100%"
                height="336px"
                className="w-full shadow-[0_6px_20px_rgba(0,0,0,0.06)]"
              >
                <div className="relative flex h-full w-full flex-col justify-between text-right select-none">
                  <div className="h-[200px] w-full overflow-hidden rounded-[15px] border border-[#CCD6E0] bg-slate-900/15 shadow-inner">
                    <img
                      src={w.img}
                      alt={w.t}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="mt-2.5">
                    <p className="font-ar text-right text-xs font-bold text-sky-600">{w.tag}</p>
                    <h3 className="font-ar mt-1 text-right text-base font-bold text-slate-900 leading-snug">{w.t}</h3>
                    <p className="font-ar mt-2 text-right text-xs font-bold text-sky-600 hover:underline">عرض دراسة الحالة ←</p>
                  </div>
                </div>
              </ReflectiveCard>
            </div>
          ))}
        </div>
        <div className="tactile-snap mt-8 text-center">
          <button
            onClick={() => scrollToElementId("team")}
            className={`${btn} h-16 px-8 text-xl`}
          >
            <span>استكشف معرض الأعمال</span>
            <span className="btn-arrow ms-2 inline-block">←</span>
          </button>
        </div>
      </div>
    </section>
  );
}

function Team() {
  const [ref, stage, inView] = useDramaticStage<HTMLDivElement>({ threshold: 0.25 });
  const teamList = TEAM_CARDS.map(withBase);
  const list = [...teamList, ...teamList, ...teamList];
  return (
    <section
      id="team"
      ref={ref}
      data-stage={stage}
      className="dramatic-stage relative flex h-screen min-h-[720px] w-full snap-start snap-always shrink-0 flex-col items-center justify-center overflow-hidden bg-white pb-6 pt-[96px]"
    >
      <LaserHorizon />
      <SpatialVoidFlare />
      <SectionTelemetry code="SEC-06" label="LEADERSHIP_AND_EXPERTS" />

      <div
        className={`pointer-events-none absolute inset-0 transition-opacity duration-1000 ease-cinematic ${
          inView ? "opacity-100" : "opacity-0"
        } cinematic-glow`}
      />
      <ElectricCircuit inView={inView} />
      <div className="relative w-full">
        <Title
          inView={inView}
          stage={stage}
          sub="نخبة من المهندسين والمعماريين يقودون تطوير الحلول البرمجية السيادية للمملكة."
        >
          فريق القيادة والخبراء
        </Title>
        <div
          className="delaminate-card delaminate-stagger-2 relative mt-8 w-full overflow-hidden marquee-fade-mask py-3"
          dir="ltr"
        >
          <div className="animate-team-marquee">
            {/* Sub-track 1 */}
            <div className="flex shrink-0 items-center gap-7 pe-7">
              {list.map((src, k) => (
                <div key={`t1-${k}`} dir="rtl" className="shrink-0">
                  <ProfileCard
                    avatarUrl={src}
                    width="300px"
                    height="400px"
                    radius={20}
                    holo={0.8}
                    glare={0.5}
                    tiltStrength={12}
                    parallax={8}
                    enableTilt
                    intro={false}
                    showUserInfo={false}
                    theme="light"
                    className="team-card"
                  />
                </div>
              ))}
            </div>
            {/* Sub-track 2 (Identical Clone for Seamless Infinite Continuity) */}
            <div className="flex shrink-0 items-center gap-7 pe-7" aria-hidden="true">
              {list.map((src, k) => (
                <div key={`t2-${k}`} dir="rtl" className="shrink-0">
                  <ProfileCard
                    avatarUrl={src}
                    width="300px"
                    height="400px"
                    radius={20}
                    holo={0.8}
                    glare={0.5}
                    tiltStrength={12}
                    parallax={8}
                    enableTilt
                    intro={false}
                    showUserInfo={false}
                    theme="light"
                    className="team-card"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  const [ref, stage, inView] = useDramaticStage<HTMLDivElement>({ threshold: 0.25 });

  return (
    <section
      id="reviews"
      ref={ref}
      data-stage={stage}
      className="dramatic-stage relative flex h-screen min-h-[720px] w-full snap-start snap-always shrink-0 flex-col items-center justify-center overflow-hidden bg-slate-50 pb-6 pt-[96px]"
    >
      <LaserHorizon />
      <SpatialVoidFlare />
      <SectionTelemetry code="SEC-07" label="CLIENT_TESTIMONIALS" />

      <div
        className={`pointer-events-none absolute inset-0 transition-opacity duration-1000 ease-cinematic ${
          inView ? "opacity-100" : "opacity-0"
        } cinematic-glow`}
      />
      <ElectricCircuit inView={inView} />
      <div className="relative mx-auto w-full max-w-[1240px] px-4">
        <Title
          inView={inView}
          stage={stage}
          sub="تجارب حقيقية لقيادات تقنية في كبرى الجهات والمنشآت الوطنية التي اعتمدت على أنظمتنا البرمجية."
        >
          شهادات شركاء النجاح وقادة التحول الرقمي
        </Title>
        <div className="mx-auto mt-10 grid max-w-[1200px] gap-6 px-4 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, idx) => (
            <figure
              key={r.n}
              className={`delaminate-card ${
                idx === 0
                  ? "delaminate-stagger-1"
                  : idx === 1
                  ? "delaminate-stagger-2"
                  : "delaminate-stagger-3"
              } rounded-[20px] border border-[#CCD6E0] bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-sky-300`}
            >
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-[#D8D8D8]">
                  <img src={IMG.avatar} alt="" className="h-full w-full object-cover" />
                </div>
                <div className="text-right">
                  <div className="font-ar text-lg font-bold text-slate-900">{r.n}</div>
                  <div className="font-ar mt-0.5 text-[11px] text-primary">{r.r}</div>
                </div>
              </div>
              <div className="my-4 h-px bg-slate-100" />
              <blockquote className="font-ar text-right text-base leading-[1.5] text-slate-600">"{r.q}"</blockquote>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Partners() {
  const [ref, stage, inView] = useDramaticStage<HTMLDivElement>({ threshold: 0.25 });
  const partnerLogos = [...logos, ...logos, ...logos];
  return (
    <section
      id="partners"
      ref={ref}
      data-stage={stage}
      className="dramatic-stage relative flex h-screen min-h-[700px] w-full snap-start snap-always shrink-0 flex-col items-center justify-center overflow-hidden bg-white pb-6 pt-[96px]"
    >
      <LaserHorizon />
      <SpatialVoidFlare />
      <SectionTelemetry code="SEC-08" label="INSTITUTIONAL_PARTNERS" />

      <div
        className={`pointer-events-none absolute inset-0 transition-opacity duration-1000 ease-cinematic ${
          inView ? "opacity-100" : "opacity-0"
        } cinematic-glow`}
      />
      <ElectricCircuit inView={inView} />
      <div className="relative w-full">
        <Title
          inView={inView}
          stage={stage}
          sub="أكثر من 50 جهة حكومية ومنشأة وطنية كبرى تعتمد على بنيتنا البرمجية الآمنة."
        >
          شركاء النجاح
        </Title>
        <div
          className="delaminate-card delaminate-stagger-2 relative mt-12 w-full overflow-hidden marquee-fade-mask py-4"
          dir="ltr"
        >
          <div className="animate-partners-marquee">
            {/* Sub-track 1 */}
            <div className="flex shrink-0 items-center gap-16 pe-16">
              {partnerLogos.map((l, k) => (
                <img key={`p1-${k}`} src={l.src} alt="شريك النجاح" className={`${l.cls} shrink-0 object-contain`} />
              ))}
            </div>
            {/* Sub-track 2 (Identical Clone for Seamless Infinite Continuity) */}
            <div className="flex shrink-0 items-center gap-16 pe-16" aria-hidden="true">
              {partnerLogos.map((l, k) => (
                <img key={`p2-${k}`} src={l.src} alt="شريك النجاح" className={`${l.cls} shrink-0 object-contain`} />
              ))}
            </div>
          </div>
        </div>
        <div className="tactile-snap mt-10 text-center">
          <button
            onClick={() => scrollToElementId("contact")}
            className={`${btn} h-[80px] px-10 text-[26px]`}
          >
            <span>كن شريكاً لنا في النجاح</span>
            <span className="btn-arrow ms-3 inline-block">←</span>
          </button>
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const [ref, stage, inView] = useDramaticStage<HTMLDivElement>({ threshold: 0.2 });
  const [chip, setChip] = useState(0);
  const field = "font-ar h-11 w-full rounded-[10px] border border-slate-700 bg-white px-4 text-right text-xs text-slate-900 placeholder:text-slate-500";
  const label = "font-ar mb-1.5 block text-right text-xs font-bold text-slate-200";
  return (
    <section
      id="contact"
      ref={ref}
      data-stage={stage}
      className="dramatic-stage relative flex h-screen min-h-[780px] w-full snap-start snap-always shrink-0 flex-col items-center justify-center overflow-hidden bg-white px-4 pb-4 pt-[96px] md:px-[60px]"
    >
      <LaserHorizon />
      <SpatialVoidFlare intense />
      <SectionTelemetry code="SEC-09" label="DIRECT_CTO_CONSULTATION" />

      <div
        className={`pointer-events-none absolute inset-0 transition-opacity duration-1000 ease-cinematic ${
          inView ? "opacity-100" : "opacity-0"
        } cinematic-glow-intense`}
      />
      <ElectricCircuit inView={inView} />
      <form
        onSubmit={(e) => e.preventDefault()}
        className="delaminate-card delaminate-stagger-1 specular-glint-active relative mx-auto w-full max-w-[1200px] rounded-3xl bg-primary px-6 py-8 shadow-xl md:px-[64px] md:py-10"
      >
        <h2 className="dramatic-headline font-ar text-center text-2xl font-bold text-white py-1.5 md:py-2 md:text-[28px]">جاهز لبناء منصتك البرمجية القادمة؟</h2>
        <p className="dramatic-sub font-ar mt-2 text-center text-xs text-white py-0.5 md:text-[14px]">
          أدخل بيانات مشروعك وسيتواصل معك أحد كبار مهندسينا خلال ساعتي عمل لمناقشة المتطلبات وتقديم العرض الفني والمالي.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div><label className={label}>الاسم الكامل *</label><input className={field} placeholder="مثال: م. عبد الله الشهري" /></div>
          <div><label className={label}>اسم الجهة أو الشركة *</label><input className={field} placeholder="مثال: هيئة حكومية / منشأة تقنية مالية" /></div>
          <div><label className={label}>البريد الإلكتروني للعمل *</label><input type="email" dir="ltr" className={`${field} !text-right`} placeholder="name@organization.sa" style={{ fontFamily: "Geist, sans-serif" }} /></div>
          <div><label className={label}>رقم الجوال أو واتساب *</label><input dir="ltr" className={`${field} !text-right`} placeholder="+966 5X XXX XXXX" style={{ fontFamily: "Geist, sans-serif" }} /></div>
        </div>
        <span className={`${label} mt-4`}>نوع المشروع أو الخدمة المطلوبة *</span>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {chips.map((c, k) => (
            <button
              type="button"
              key={c}
              onClick={() => setChip(k)}
              className={`font-ar h-[38px] rounded-[10px] border text-xs transition-all ${k === chip ? "border-white bg-white font-bold text-slate-900 shadow-md" : "border-slate-700 bg-white font-normal text-slate-400"}`}
            >
              {k === chip ? "● " : "○ "}{c}
            </button>
          ))}
        </div>
        <label className={`${label} mt-4`}>تفاصيل ونطاق العمل المبدئي (اختياري)</label>
        <textarea rows={2} className={`${field} h-16 py-2.5`} placeholder="اكتب نبذة مختصرة عن أهداف المنصة، التكاملات المطلوبة، أو أي مواعيد نهائية مستهدفة للإطلاق..." />
        <div className="mt-5 flex flex-col-reverse items-center gap-4 md:flex-row-reverse md:justify-between">
          <div className="tactile-snap flex w-full flex-col gap-3 md:w-auto md:flex-row-reverse">
            <button type="submit" className="btn-tactile-white font-ar h-[46px] w-full rounded-xl bg-white text-xs font-bold text-slate-900 shadow-lg md:w-[320px]">
              <span>إرسال طلب الاستشارة وعرض السعر</span>
              <span className="btn-arrow ms-1.5 inline-block">←</span>
            </button>
            <button type="button" className="btn-tactile font-ar h-[46px] w-full rounded-xl border border-slate-700 bg-[#004E77] text-xs font-bold text-slate-50 md:w-[200px]">
              <span>تواصل عبر واتساب</span>
            </button>
          </div>
          <p className="font-ar max-w-[390px] text-right text-[10px] text-white">
            جميع البيانات تعامل بسرية تامة ومحمية باتفاقية عدم إفصاح (NDA) وفق ضوابط نظام حماية البيانات الشخصية PDPL.
          </p>
        </div>
      </form>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative w-full snap-start snap-always shrink-0 border-t border-slate-300 bg-white px-6 pb-8 pt-10 md:px-[50px]">
      <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr_1.3fr]">
        <div className="flex flex-col items-center gap-4 text-center md:items-end md:text-right">
          <img src={IMG.footerLogo} alt="" className="h-36 w-36" />
          <div className="font-ar text-4xl font-extrabold text-slate-900">محفز التفكير للبرمجيات</div>
          <p className="font-ar max-w-[415px] text-base text-slate-500">شريك التطوير البرمجي المؤسسي لبناء المنظومات السحابية والمنصات الوطنية عالية التزامن والسيادة الرقمية.</p>
        </div>
        <div className="text-right">
          <h4 className="font-ar mb-6 text-3xl font-bold text-slate-900">من نحن؟</h4>
          <ul className="font-ar space-y-3 text-xl text-slate-600">
            <li>عن محفز التفكير</li><li>المدونة</li><li>الاسئلة الشائعة</li><li>سياسات الخصوصية</li>
          </ul>
        </div>
        <div className="text-right">
          <h4 className="font-ar mb-6 text-3xl font-bold text-slate-900">ماذا نفعل؟</h4>
          <ul className="font-ar space-y-3 text-xl text-slate-600">
            <li>اعمالنا</li><li>الخدمات القوالب</li><li>المنتجات والاسعار القطاعات</li><li>الوظائف</li>
          </ul>
        </div>
        <div className="flex flex-col items-center gap-6 text-center">
          <h4 className="font-ar text-3xl font-extrabold text-slate-900">تجاوز معنا حدود الممكن البرمجي فنحن نتحدث لغة الكود</h4>
          <button
            onClick={() => scrollToElementId("contact")}
            className={`${btn} h-[54px] px-8 text-xl`}
          >
            <span>ابدأ رحلتك البرمجية الآن</span>
            <IconArrowLeft className="ms-2 h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="mt-10 border-t border-slate-200 pt-5">
        <p className="font-ar text-right text-[11px] text-slate-500">جميع الحقوق محفوظة © 2026 محفز التفكير للبرمجيات • المملكة العربية السعودية</p>
      </div>
    </footer>
  );
}

export default function HomeRoute() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div dir="rtl" lang="ar" className="font-ar relative min-h-full w-full flex-1 bg-white">
      <Header onOpenDrawer={() => setIsDrawerOpen(true)} />
      <SideDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        logoSrc={IMG.logo}
      />
      <Hero />
      <Vision />
      <Industries />
      <Services />
      <Work />
      <Team />
      <Reviews />
      <Partners />
      <ContactForm />
      <Footer />
    </div>
  );
}

