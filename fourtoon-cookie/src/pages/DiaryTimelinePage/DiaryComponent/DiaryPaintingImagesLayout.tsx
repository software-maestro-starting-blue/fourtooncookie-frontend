import React, { useState, useContext } from "react";
import { View, Modal, Image, TouchableOpacity, Text, StyleSheet } from "react-native";

import { useFunctionWithErrorHandling } from "../../../hooks/error";

export interface DiaryPaintingImagesLayoutProps {
    imageUrls: string[];
}

const DiaryPaintingImagesLayout = (props: DiaryPaintingImagesLayoutProps) => {
    const { imageUrls, ...rest } = props;
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const { functionWithErrorHandling } = useFunctionWithErrorHandling();

    const handleImagePress = functionWithErrorHandling((imageUrl: string) => {
        setSelectedImage(imageUrl);
        setModalVisible(true);
    });

    const handleCloseModal = functionWithErrorHandling(() => {
        setModalVisible(false);
        setSelectedImage(null);
    });

    return (
        <View>
            <View style={styles.grid}>
                {imageUrls.map((imageUrl, index) => (
                    <TouchableOpacity style={styles.imageContainer} key={index} onPress={() => handleImagePress(imageUrl)}>
                        <Image
                            source={{ uri: imageUrl }}
                            style={styles.image}
                        />
                    </TouchableOpacity>
                ))}
            </View>
            <ImageModal 
                isModalVisible={isModalVisible}
                selectedImage={selectedImage}
                onCloseModal={handleCloseModal}
                />
        </View>
    );
}

export default DiaryPaintingImagesLayout;

interface ImageModalProps {
    isModalVisible: boolean;
    selectedImage: string | null;
    onCloseModal: () => void;
}

const ImageModal = (props: ImageModalProps) => {
    const { isModalVisible, selectedImage, onCloseModal, ...rest } = props;

    if (! isModalVisible) return null;

    return (
        <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={onCloseModal}
            >
                <View style={styles.modalBackground}>
                    <TouchableOpacity style={styles.modalContainer} onPress={onCloseModal}>
                        <View style={styles.modalContent}>
                            <TouchableOpacity style={styles.closeButton} onPress={onCloseModal}>
                                <Text style={styles.closeButtonText}>X</Text>
                            </TouchableOpacity>
                            {selectedImage && (
                                <Image 
                                    source={{ uri: selectedImage }}
                                    style={styles.modalImage}
                                    resizeMode="contain"
                                />
                            )}
                        </View>
                    </TouchableOpacity>
                </View>
        </Modal>
    )

}

const styles = StyleSheet.create({
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: "100%",
        aspectRatio: 1,
        borderRadius: 20,
    },
    imageContainer: {
        width: "49%",
        height: "49%",
        alignItems: 'center',
        marginBottom: 10,
    },
    image: {
        flex: 1,
        width: "100%",
        height: "100%",
        resizeMode: 'contain',
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '90%',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        overflow: 'hidden',
    },
    modalImage: {
        width: '100%',
        height: 'auto',
        aspectRatio: 1,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 15,
        padding: 5,
        zIndex: 10,
    },
    closeButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
});
