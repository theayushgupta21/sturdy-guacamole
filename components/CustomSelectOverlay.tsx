
import { OverlayPanel } from "primereact/overlaypanel";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { useRef, useState } from "react";
import type { Artwork } from "../src/types";

interface Props {
    currentPageData: Artwork[];
    onSelect: (rows: Artwork[]) => void;
}


function CustomSelectOverlay({ currentPageData, onSelect }: Props) {
    const overlayRef = useRef<OverlayPanel>(null);
    const [count, setCount] = useState<number | null>(null);

    const handleSelect = () => {
        if (!count || count <= 0) return;

        // ⚠️ Only select rows from CURRENT PAGE
        const selected = currentPageData.slice(0, count);
        onSelect(selected);

        overlayRef.current?.hide();
        setCount(null);
    };
    return (
        <>
            <Button
                label="Custom Select"
                icon="pi pi-sliders-h"
                onClick={(e) => overlayRef.current?.toggle(e)}
            />

            <OverlayPanel ref={overlayRef}>
                <div className="flex flex-col gap-3 w-60">
                    <span>Select rows (current page only)</span>
                    <InputNumber
                        value={count}
                        onValueChange={(e) => setCount(e.value ?? null)}
                        min={1}
                        max={currentPageData.length}
                    />
                    <Button label="Apply" onClick={handleSelect} />
                </div>
            </OverlayPanel>
        </>
    )
}

export default CustomSelectOverlay