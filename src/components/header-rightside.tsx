import { Button } from "@/components/ui/button";

import { ChevronDown, Globe, Search } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function HeaderRightSide() {
  return (
    <div className="right-side relative flex items-center justify-center gap-[18px]">
      <div className="relative flex items-center justify-center gap-6">
        <Search className="h-5 w-5" />
        <span className="block w-0.5 h-4 bg-foreground"></span>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="relative flex items-center justify-center gap-1 text-[18px]">
              <span>
                <Globe className="text-primary h-4 w-4" />
              </span>
              EN
              <span>
                <ChevronDown className="h-4 w-4" />
              </span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Language</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>English</DropdownMenuItem>
            <DropdownMenuItem>Español</DropdownMenuItem>
            <DropdownMenuItem>हिन्दी</DropdownMenuItem>
            <DropdownMenuItem>Português (BR)</DropdownMenuItem>
            <DropdownMenuItem>Français</DropdownMenuItem>
            <DropdownMenuItem>한국어</DropdownMenuItem>
            <DropdownMenuItem>Deutsch</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Button
        size="lg"
        className="uppercase text-[18px] border-2 border-primary bg-transparent rounded-4xl"
      >
        Sign In
      </Button>
    </div>
  );
}
