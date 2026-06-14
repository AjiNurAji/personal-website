import React, { useState, useMemo } from "react";
import * as SimpleIcons from "react-icons/si";
import { Button } from "@/Components/UI/button";
import { Input } from "@/Components/UI/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/UI/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/Components/UI/tooltip";

export function IconPicker({ value, onChange }: { value: string, onChange: (val: string) => void }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const icons = useMemo(() => {
    return Object.keys(SimpleIcons)
      .map((key) => ({
        key,
        // @ts-ignore
        Icon: SimpleIcons[key] as React.ElementType,
      }));
  }, []);

  const filteredIcons = useMemo(() => {
    if (!search) return icons.slice(0, 150); // Show top 150 by default
    return icons.filter((i) => i.key.toLowerCase().includes(search.toLowerCase())).slice(0, 150);
  }, [icons, search]);

  const CurrentIcon = value && (SimpleIcons as any)[value] ? (SimpleIcons as any)[value] : null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full justify-start text-left font-normal flex items-center gap-2 bg-white dark:bg-zinc-950/50">
          {CurrentIcon ? <CurrentIcon className="h-4 w-4 shrink-0" /> : <div className="h-4 w-4 border border-dashed border-muted-foreground rounded-sm shrink-0" />}
          <span className="truncate">{value ? value : "Select an icon..."}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl gap-0 p-0 flex flex-col h-[80vh] overflow-hidden">
        <DialogHeader className="px-4 py-4 border-b shrink-0">
          <DialogTitle>Select Icon</DialogTitle>
        </DialogHeader>
        <div className="p-4 border-b shrink-0 bg-muted/10">
          <Input
            placeholder="Search icons (e.g. react, node, database)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <TooltipProvider delayDuration={100}>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
              {filteredIcons.map(({ key, Icon }) => (
                <Tooltip key={key}>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant={value === key ? "default" : "outline"}
                      className="h-14 w-full p-0 flex flex-col items-center justify-center transition-all hover:scale-105"
                      onClick={() => {
                        onChange(key);
                        setOpen(false);
                      }}
                    >
                      <Icon className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {key}
                  </TooltipContent>
                </Tooltip>
              ))}
              {filteredIcons.length === 0 && (
                <div className="col-span-full py-8 text-center text-muted-foreground">
                  No icons found matching "{search}".
                </div>
              )}
            </div>
          </TooltipProvider>
        </div>
      </DialogContent>
    </Dialog>
  );
}
