{
  /* USAR GRID REACT LAYOUT????? */
}

("use client");
import ReactGridLayout, {
  useContainerWidth,
  verticalCompactor,
} from "react-grid-layout";

type myPetsGridLAyoutProps = {
  children: React.ReactNode;
};
export default function MyPetsGrid({ children }: myPetsGridLAyoutProps) {
  const { width, containerRef, mounted } = useContainerWidth();

  return (
    <div ref={containerRef}>
      {mounted && (
        <ReactGridLayout
          width={width}
          gridConfig={{ cols: 12, rowHeight: 30 }}
          dragConfig={{ enabled: true, handle: ".handle" }}
          compactor={verticalCompactor}
        >
          {children}
        </ReactGridLayout>
      )}
    </div>
  );
}
