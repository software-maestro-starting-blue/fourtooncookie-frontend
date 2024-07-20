import React, { useState } from "react";
import { View, Modal, Image, TouchableOpacity, Text } from "react-native";
import ImageButton from "../../../../components/common/ImageButton/ImageButton";
import * as S from './DiaryPaintingImagesLayout.styled';

export interface DiaryPaintingImagesLayoutProps {
    imageUrls: string[];
}

const DiaryPaintingImagesLayout = (props: DiaryPaintingImagesLayoutProps) => {
    const { imageUrls, ...rest } = props;
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const openModal = (imageUrl: string) => {
        setSelectedImage(imageUrl);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedImage(null);
    };

    return (
        <View style={S.styles.grid}>
            {imageUrls.map((imageUrl, index) => (
                <ImageButton 
                    key={index}
                    imageUrl={imageUrl} 
                    onPress={() => openModal(imageUrl)} 
                    style={S.styles.imageLayout} 
                    imageStyle={S.styles.image} 
                />
            ))}
            <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={closeModal}
            >
                <View style={S.styles.modalBackground}>
                    <TouchableOpacity style={S.styles.modalContainer} onPress={closeModal}>
                        <View style={S.styles.modalContent}>
                            <TouchableOpacity style={S.styles.closeButton} onPress={closeModal}>
                                <Text style={S.styles.closeButtonText}>X</Text>
                            </TouchableOpacity>
                            {selectedImage && (
                                <Image 
                                    source={{ uri: selectedImage }}
                                    style={S.styles.modalImage}
                                    resizeMode="contain"
                                />
                            )}
                        </View>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

export default DiaryPaintingImagesLayout;
