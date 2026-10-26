import React from "react";
import { MapPin } from "lucide-react";
import { SOZ_BRAND_IDENTITY } from "@/data/soz-menu-data";

const InstagramIcon: React.FC<{ className?: string }> = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const TikTokIcon: React.FC<{ className?: string }> = ({ className = "w-3.5 h-3.5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
  </svg>
);

export type NavPageId = "home" | "rice-soups" | "fries-chops" | "liter-bowls" | "private-chef";

interface FooterProps {
  onNavigate?: (page: NavPageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="relative bg-[#0B070E] border-t border-[#D4AF37]/20 pt-12 pb-24 md:pb-12 text-xs text-[#B8ACA3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 3 Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Col 1: Brand Identifier & Tagline */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-2xl text-[#FAF6F0] tracking-wider">
                SO'Z
              </span>
              <span className="font-script text-2xl text-[#D4AF37] font-semibold -ml-0.5">
                Cravings
              </span>
            </div>

            <p className="font-mono text-xs font-bold text-[#E86F2C] tracking-wider uppercase">
              {SOZ_BRAND_IDENTITY.primaryTagline}
            </p>

            <p className="text-xs text-[#B8ACA3] leading-relaxed">
              Port Harcourt's premier catering studio for authentic liter bowls, small chops event packs, and luxury surprise food trays.
            </p>
          </div>

          {/* Col 2: Kitchen Base & Schedule */}
          <div className="space-y-2.5">
            <h4 className="font-mono text-xs uppercase tracking-wider text-[#FAF6F0] font-bold">
              Kitchen Base & Schedule
            </h4>
            <p className="text-xs text-[#FAF6F0] flex items-start gap-1.5 leading-relaxed">
              <MapPin className="w-4 h-4 text-[#E86F2C] shrink-0 mt-0.5" />
              <span>{SOZ_BRAND_IDENTITY.kitchenBaseLocation}</span>
            </p>
            <p className="text-[11px] text-[#D4AF37] font-mono pt-1">
              Monday – Saturday: 8:00 AM – 7:00 PM
            </p>
          </div>

          {/* Col 3: Contact & Socials */}
          <div className="space-y-2.5">
            <h4 className="font-mono text-xs uppercase tracking-wider text-[#FAF6F0] font-bold">
              Direct Contact & Socials
            </h4>
            <div className="space-y-1 font-mono text-xs">
              <a
                href={`tel:${SOZ_BRAND_IDENTITY.displayPhonePrimary.replace(/\s+/g, "")}`}
                className="block text-[#FAF6F0] hover:text-[#E86F2C] transition-colors"
              >
                {SOZ_BRAND_IDENTITY.displayPhonePrimary}
              </a>
              <a
                href={`tel:${SOZ_BRAND_IDENTITY.displayPhoneSecondary.replace(/\s+/g, "")}`}
                className="block text-[#FAF6F0] hover:text-[#E86F2C] transition-colors"
              >
                {SOZ_BRAND_IDENTITY.displayPhoneSecondary}
              </a>
            </div>

            <a
              href={`https://wa.me/${SOZ_BRAND_IDENTITY.whatsappPrimary}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#25D366] font-semibold flex items-center gap-1.5 pt-1 hover:underline"
            >
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
              WhatsApp: +234 903 090 7698
            </a>

            <div className="pt-2 flex items-center gap-3 text-xs">
              <a
                href="https://instagram.com/soz_cravings"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-[#171115] border border-[#D4AF37]/30 text-[#FAF6F0] hover:text-[#E86F2C] hover:border-[#E86F2C] transition-colors flex items-center gap-1.5"
              >
                <InstagramIcon className="w-3.5 h-3.5 text-[#E86F2C]" />
                <span>Instagram</span>
              </a>
              <a
                href="https://tiktok.com/@sonia_gbens"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-[#171115] border border-[#D4AF37]/30 text-[#FAF6F0] hover:text-[#E86F2C] hover:border-[#E86F2C] transition-colors flex items-center gap-1.5"
              >
                <TikTokIcon className="w-3.5 h-3.5 text-[#E86F2C]" />
                <span>TikTok</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 border-t border-[rgba(212,175,55,0.16)] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#B8ACA3]">
          <p>© {new Date().getFullYear()} So'z Cravings. All Rights Reserved. Kitchen Base: Eneka, Port Harcourt.</p>
          <p className="font-mono text-[11px] text-[#D4AF37]">
            {SOZ_BRAND_IDENTITY.secondaryTagline}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
