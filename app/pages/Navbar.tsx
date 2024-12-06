// "use client";
// import React, { useState } from "react";
// import { HoveredLink, Menu, MenuItem, ProductItem } from "../components/ui/navbar-menu";
// import { cn } from "../lib/utils";


// export function NavbarDemo() {
//   return ( 
//     <div className="relative w-full flex items-center justify-center">
//       <Navbar className="top-3 " />
//     </div>
//   );
// }

// function Navbar({ className }: { className?: string }) {
//   const [active, setActive] = useState<string | null>(null);
//   return (
//     <div className={cn("fixed top-10 w-full z-50 flex items-center justify-between px-6", className)}>
//   {/* Left-aligned logo */}
//   {/* <div className="flex-shrink-0">
  
//   </div> */}

//   {/* Centered menu */}
//   <div className="flex-1 flex justify-center">
    
//     <Menu className="flex space-x-6" setActive={setActive}>
//     <img src="/logo.png" alt="Company Logo" width={35} className="mt-[-5px] cursor-pointer"  />
//       {/* Home */}
//       <MenuItem setActive={setActive} active={active} item="Home" />

//       {/* Services */}
//       <MenuItem setActive={setActive} active={active} item="Services">
//         <div className="flex flex-col space-y-4 text-sm">
//           <HoveredLink href="/web-dev">Web Development</HoveredLink>
//           <HoveredLink href="/interface-design">Interface Design</HoveredLink>
//           <HoveredLink href="/seo">Search Engine Optimization</HoveredLink>
//           <HoveredLink href="/branding">Branding</HoveredLink>
//         </div>
//       </MenuItem>

//       {/* Products */}
//       <MenuItem setActive={setActive} active={active} item="Products" />
//     </Menu>
//   </div>
// </div>

//   );
// }
"use client";
import React, { useLayoutEffect } from "react";
import { HoveredLink, Menu, MenuItem } from "../components/ui/navbar-menu";
import { cn } from "../lib/utils";

export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-3" />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  useLayoutEffect(() => {
    // Always enable dark mode
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
      {/* Centered Menu */}
      <div className="flex-1 flex justify-center">
        <Menu setActive={setActive}>
          <img
            src="/logo.png"
            alt="Company Logo"
            width={35}
            className="mt-[-5px] cursor-pointer"
          />
          {/* Home */}
          <MenuItem setActive={setActive} active={active} item="Home" />

          {/* Services */}
          <MenuItem setActive={setActive} active={active} item="Services" />

          {/* Products */}
          <MenuItem setActive={setActive} active={active} item="Products" />
        </Menu>
      </div>
    </div>
  );
}