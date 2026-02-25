import { DataTable } from "primereact/datatable";
import type { DataTablePageEvent } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useState } from "react";
import type { Artwork } from "../src/types";
import { fetchArtworks } from "../api/ArtTable";
import CustomSelectOverlay from "./CustomSelectOverlay";

export default function ArtTable() {
    const [data, setData] = useState<Artwork[]>([]);
    const [selectedRows, setSelectedRows] = useState<Record<number, Artwork>>({});
    const [loading, setLoading] = useState(false);

    const [totalRecords, setTotalRecords] = useState(0);
    const [page, setPage] = useState(1);
    const rowsPerPage = 12;

    useEffect(() => {
        loadData(page);
    }, [page]);

    const loadData = async (pageNumber: number) => {
        setLoading(true);
        const res = await fetchArtworks(pageNumber);
        setData(res.data);
        setTotalRecords(res.pagination.total);
        setLoading(false);
    };

    const onPageChange = (e: DataTablePageEvent) => {
        setPage(e.page! + 1);
    };

    const currentSelection = data.filter((row) => selectedRows[row.id]);

    return (
        <div className="p-4">
            <div className="mb-3 flex gap-3">
                <CustomSelectOverlay
                    currentPageData={data}
                    onSelect={(rows) => {
                        const updated = { ...selectedRows };
                        rows.forEach((r) => (updated[r.id] = r));
                        setSelectedRows(updated);
                    }}
                />
            </div>

            <DataTable
                value={data}
                loading={loading}
                paginator
                rows={rowsPerPage}
                totalRecords={totalRecords}
                lazy
                onPage={onPageChange}
                selection={currentSelection}
                onSelectionChange={(e) => {
                    const updated = { ...selectedRows };

                    // remove deselected rows of current page
                    data.forEach((row) => {
                        if (!e.value.some((r: Artwork) => r.id === row.id)) {
                            delete updated[row.id];
                        }
                    });

                    // add selected
                    e.value.forEach((row: Artwork) => {
                        updated[row.id] = row;
                    });

                    setSelectedRows(updated);
                }}
                dataKey="id"
                selectionMode="checkbox"
            >
                <Column selectionMode="multiple" headerStyle={{ width: "3rem" }} />
                <Column field="title" header="Title" />
                <Column field="place_of_origin" header="Origin" />
                <Column field="artist_display" header="Artist" />
                <Column field="inscriptions" header="Inscriptions" />
                <Column field="date_start" header="Start Year" />
                <Column field="date_end" header="End Year" />
            </DataTable>
        </div>
    );
}