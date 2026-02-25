import { OverlayPanel } from "primereact/overlaypanel";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import { Slider } from "primereact/slider";
import { useRef, useState } from "react";
import type { Artwork } from "../src/types";

interface Props {
    currentPageData: Artwork[];
    onSelect: (rows: Artwork[]) => void;
}

export default function CustomSelectOverlay({ currentPageData, onSelect }: Props) {
    const overlayRef = useRef<OverlayPanel>(null);
    const [count, setCount] = useState(0);
    const [persistedSelection, setPersistedSelection] = useState<Artwork[]>([]);

    const handleCountChange = (value: number) => {
        setCount(value);
        const preview = currentPageData.slice(-value);
        setPersistedSelection(preview);
        onSelect(preview);
    };

    const handleApply = () => {
        if (count <= 0) return;
        const selected = currentPageData.slice(-count);
        setPersistedSelection(selected);
        onSelect(selected);
        overlayRef.current?.hide();
    };

    return (
        <>
            <Button
                label="Custom Select"
                icon="pi pi-sliders-h"
                onClick={(e) => overlayRef.current?.toggle(e)}
            />

            <OverlayPanel ref={overlayRef}>
                <div className="flex flex-col gap-4 w-80">

                    <span className="font-semibold">
                        Select LAST rows (current page)
                    </span>

                    <Slider
                        value={count}
                        min={0}
                        max={currentPageData.length}
                        onChange={(e) => handleCountChange(e.value as number)}
                    />

                    <InputNumber
                        value={count}
                        min={0}
                        max={currentPageData.length}
                        onValueChange={(e) => handleCountChange(e.value ?? 0)}
                        showButtons
                    />

                    <small className="text-gray-600">
                        {count > 0
                            ? `Previewing last ${count} row(s) - Total Selected: ${persistedSelection.length}`
                            : "Move slider to preview selection"}
                    </small>

                    {/* Preview List */}
                    {persistedSelection.length > 0 && (
                        <div className="border rounded p-3 max-h-48 overflow-y-auto bg-gray-50">
                            <div className="text-sm font-semibold mb-2">Preview ({persistedSelection.length}):</div>
                            {persistedSelection.map((item) => (
                                <div key={item.id} className="p-2 border-b text-xs">
                                    <div className="font-semibold">{item.title}</div>
                                    <div className="text-gray-600">{item.artist_display}</div>
                                </div>
                            ))}
                        </div>
                    )}

                    <Button
                        label="Apply Selection"
                        icon="pi pi-check"
                        onClick={handleApply}
                        disabled={count <= 0}
                    />
                </div>
            </OverlayPanel>
        </>
    );
}