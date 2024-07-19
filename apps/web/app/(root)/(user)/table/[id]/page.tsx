"use client";
import { Box, useEffect } from "@repo/ui";
import { useTableStore } from "../../../../store";
import { useRouter } from "next/navigation";
interface TableId {
  params: { id: string };
}
const TablePage: React.FC<TableId> = ({ params }) => {
  const tableId = params.id;
  const router = useRouter();
  const { setTableId } = useTableStore((state) => state);
  useEffect(() => {
    setTableId(tableId);
    router.push("/");
  }, [setTableId, tableId]);
  return (
    <>
      <Box>Redirecting...</Box>
    </>
  );
};

export default TablePage;
