import React, { useState } from 'react';
import { Button } from '@/Components/UI/button';
import { 
    RiRefreshLine, 
    RiExternalLinkLine, 
    RiComputerLine, 
    RiSmartphoneLine, 
    RiTabletLine,
    RiEyeLine
} from '@remixicon/react';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/Components/UI/dialog";
import { RiCloseLine } from "@remixicon/react";

export function PreviewModal() {
    const [open, setOpen] = useState(false);
    const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
    const [key, setKey] = useState(0);

    const handleRefresh = () => {
        setKey(prev => prev + 1);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="hidden md:flex gap-2">
                    <RiEyeLine className="size-4" />
                    Preview
                </Button>
            </DialogTrigger>
            
            {/* Provide a smaller trigger icon for mobile if needed, but since admin is usually desktop we'll use the same or just show it */}
            <DialogTrigger asChild className="md:hidden">
                <Button variant="outline" size="icon-sm">
                    <RiEyeLine className="size-4" />
                </Button>
            </DialogTrigger>

            <DialogContent showCloseButton={false} className="max-w-[95vw] sm:max-w-[95vw] md:max-w-[95vw] w-full h-[95vh] max-h-[95vh] flex flex-col p-0 gap-0 overflow-hidden">
                <DialogHeader className="px-4 py-3 border-b shrink-0 flex flex-row items-center justify-between">
                    <div className="flex items-center gap-4">
                        <DialogTitle className="m-0">Live Preview</DialogTitle>
                    </div>
                    
                    <div className="flex items-center gap-2 sm:gap-4">
                        <div className="hidden sm:flex items-center rounded-md border p-1 bg-muted/50">
                            <Button
                                variant={viewMode === 'desktop' ? 'secondary' : 'ghost'}
                                size="icon-sm"
                                onClick={() => setViewMode('desktop')}
                                title="Desktop View"
                            >
                                <RiComputerLine className="size-4" />
                            </Button>
                            <Button
                                variant={viewMode === 'tablet' ? 'secondary' : 'ghost'}
                                size="icon-sm"
                                onClick={() => setViewMode('tablet')}
                                title="Tablet View"
                            >
                                <RiTabletLine className="size-4" />
                            </Button>
                            <Button
                                variant={viewMode === 'mobile' ? 'secondary' : 'ghost'}
                                size="icon-sm"
                                onClick={() => setViewMode('mobile')}
                                title="Mobile View"
                            >
                                <RiSmartphoneLine className="size-4" />
                            </Button>
                        </div>
                        
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="icon-sm" onClick={handleRefresh} title="Refresh Preview">
                                <RiRefreshLine className="size-4" />
                            </Button>
                            <Button variant="default" size="sm" asChild className="hidden sm:flex">
                                <a href="/" target="_blank" rel="noopener noreferrer">
                                    <RiExternalLinkLine className="mr-2 size-4" />
                                    Live Site
                                </a>
                            </Button>
                            <Button variant="default" size="icon-sm" asChild className="sm:hidden">
                                <a href="/" target="_blank" rel="noopener noreferrer">
                                    <RiExternalLinkLine className="size-4" />
                                </a>
                            </Button>
                            <DialogClose asChild>
                                <Button variant="ghost" size="icon-sm" title="Close Preview">
                                    <RiCloseLine className="size-5" />
                                </Button>
                            </DialogClose>
                        </div>
                    </div>
                </DialogHeader>

                <div className="flex-1 bg-zinc-100/50 dark:bg-zinc-900/50 overflow-hidden flex items-center justify-center p-2 sm:p-4">
                    <div className={cn(
                        "bg-white dark:bg-zinc-950 border shadow-md overflow-hidden transition-all duration-300 w-full h-full rounded-xl flex flex-col",
                        viewMode === 'desktop' && "max-w-full",
                        viewMode === 'tablet' && "max-w-[768px]",
                        viewMode === 'mobile' && "max-w-[375px]"
                    )}>
                        <iframe 
                            key={key}
                            src="/" 
                            className="w-full h-full border-0 bg-white dark:bg-zinc-950"
                            title="Live Preview"
                        />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
