import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

import { forwardRef, useCallback, useMemo } from "react";
import { StyleSheet, Text } from "react-native";
interface Props {
  title: string;
  children: React.ReactNode;
}

const CustomBottomSheetModal = forwardRef<BottomSheetModal, Props>(
  function CustomBottomSheetModal(props, ref) {
    // variables
    const snapPoints = useMemo(() => ["25%", "50%", "85%"], []);

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
        index={0}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        onChange={handleSheetChange}
        backdropComponent={renderBackdrop}
        enablePanDownToClose={true}
        {...props}
      >
        {/* <BottomSheetView style={styles.contentContainer}>
          <Text>{props.title}</Text>
        </BottomSheetView> */}
        {props.children}
      </BottomSheetModal>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 120,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: "center",
  },
});

export default CustomBottomSheetModal;
