"use client";
import React, { useLayoutEffect } from "react";
import { HoveredLink, Menu, MenuItem } from "../components/ui/navbar-menu";
import { cn } from "../lib/utils";

export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-4" />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  useLayoutEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const [active, setActive] = React.useState<string | null>(null);

  return (
    <div
      className={cn(
        "fixed top-10 w-full z-50 flex items-center justify-between px-6 ",
        className
      )}
    >

      <div className="flex-1 flex justify-center">
        <Menu setActive={setActive}>
          <img
            src="/logo.png"
            alt="Company Logo"
            width={35}
            className="mt-[-5px] cursor-pointer"
          />
          <MenuItem setActive={setActive} active={active} item="Home" />
          <MenuItem setActive={setActive} active={active} item="Services" />
          <MenuItem setActive={setActive} active={active} item="Products" />
        </Menu>
      </div>
    </div>
  );
}