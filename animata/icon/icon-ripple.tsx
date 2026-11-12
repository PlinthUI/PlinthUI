"use client";

/*
 * Source: Animata, https://animata.design (https://github.com/codse/animata)
 * Licence: MIT, Copyright (c) Animata. Included unmodified apart from this notice.
 * See THIRD_PARTY_NOTICES.md.
 */

import { Mic } from "lucide-react";

import { cn } from "@/lib/utils";

interface IconRippleProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Icon we want to have.
   */
  icon: React.ElementType;
  /**
   * Size of Icon
   */
  iconSize?: number;
  /**
   * Color of the Icon
   */
  iconColor?: string;
  /**
   * Border color that will have ripple animation
   */
  borderColor?: string;
  /**
   * Padding around the icon
   */
  inset?: string;
}

export default function IconRipple({
  icon: Icon = Mic,
  iconSize = 24,
  iconColor = "#ddd",
  borderColor = "#ddd",
  inset = "10px",
}: IconRippleProps) {
  const customBorderStyle = {
    borderColor,
  };
  const insetStyle = {
    top: `-${inset}`,
    bottom: `-${inset}`,
    left: `-${inset}`,
    right: `-${inset}`,
  };

  return (
    <div className={cn("group relative flex items-center justify-center")}>
      <Icon size={iconSize} color={iconColor} />
      <div
        className={cn("absolute -inset-4 animate-ping rounded-full border-2")}
        style={{ ...customBorderStyle, ...insetStyle }}
      />
    </div>
  );
}
