import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";

import { forwardRef, useCallback, useMemo } from "react";
interface Props {
  children: React.ReactNode;
}

const CustomBottomSheetModal = forwardRef<BottomSheetModal, Props>(
  function CustomBottomSheetModal(props, ref) {
    // variables
    const snapPoints = useMemo(() => ["25%", "50%", "70%"], []);

    // callbacks
    const handleSheetChange = useCallback((index: any) => {
      console.log("handleSheetChange", index);
    }, []);

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
        />
      ),
      []
    );
    return (
      <BottomSheetModal
        ref={ref}
        index={1}
        snapPoints={snapPoints}
        enableDynamicSizing={true}
        onChange={handleSheetChange}
        backdropComponent={renderBackdrop}
        enablePanDownToClose={true}
        {...props}
      >
        {props.children}
      </BottomSheetModal>
    );
  }
);

export default CustomBottomSheetModal;
