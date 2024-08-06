import { Grid, GridCol } from "@repo/ui";
import { Navbar } from "../../../components/admin/navbar/navbar";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <>
          <Grid>
            <GridCol span={1}>
              <Navbar />
            </GridCol>
            <GridCol span={11}>{children}</GridCol>
          </Grid>
        </>
      </body>
    </html>
  );
}
