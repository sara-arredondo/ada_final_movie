import { Box, Card, CardContent, Skeleton } from "@mui/material";

export default function GridSkeletonMovies({ items = 20 }) {
  return (
    <Box component="main" sx={{ px: { xs: 2, md: 3 }, py: 3 }}>
      {/* Encabezado igual que el de FullMoviesGrid */}
      <Box sx={{ mb: 2, display: "flex", alignItems: "baseline", gap: 2 }}>
        <Skeleton variant="text" width={120} animation="wave" />
      </Box>

      {/* MISMAS COLUMNAS que FullMoviesGrid */}
      <Box
        sx={{
          display: "grid",
          gap: 2,
          gridTemplateColumns: {
            xs: "repeat(2, minmax(0, 1fr))",
            sm: "repeat(3, minmax(0, 1fr))",
            md: "repeat(4, minmax(0, 1fr))",
            lg: "repeat(5, minmax(0, 1fr))",
          },
        }}
      >
        {Array.from({ length: items }).map((_, i) => (
          <Card
            key={i}
            sx={{
              bgcolor: "grey.900",
              borderRadius: 3,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              height: 430,
            }}
          >
            {/* PÓSTER con MISMO aspect-ratio 2:3 */}
            <Skeleton
              variant="rectangular"
              animation="wave"
              sx={{ width: "100%", aspectRatio: "2 / 3" }}
            />

            {/* BLOQUE DE CONTENIDO con MISMA altura fija que tus cards */}
            <CardContent
              sx={{
                py: 1.5,
                minHeight: 80,
                maxHeight: 80,
              }}
            >
              <Skeleton variant="text" width="90%" animation="wave" />
              <Skeleton variant="text" width="60%" animation="wave" />
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* (Opcional) placeholder de paginación para evitar saltos */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Skeleton variant="rounded" width={280} height={32} animation="wave" />
      </Box>
    </Box>
  );
}