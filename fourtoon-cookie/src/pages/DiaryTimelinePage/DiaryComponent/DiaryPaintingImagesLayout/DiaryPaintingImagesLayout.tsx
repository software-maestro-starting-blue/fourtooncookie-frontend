import React, { useState, useContext } from "react";
import { View, Modal, Image, TouchableOpacity, Text } from "react-native";
import GlobalSelectionCharacterStateContext from '../../../../components/global/GlobalSelectionCharacter/GlobalSelectionCharacterStateContext';

import * as S from './DiaryPaintingImagesLayout.styled';

export interface DiaryPaintingImagesLayoutProps {
    imageUrls: string[];
}

const DiaryPaintingImagesLayout = (props: DiaryPaintingImagesLayoutProps) => {
    const { imageUrls, ...rest } = props;
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const { selectedCharacter } = useContext(GlobalSelectionCharacterStateContext);

    const handleImagePress = (imageUrl: string) => {
        setSelectedImage(imageUrl);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setSelectedImage(null);
    };

    if (imageUrls.length === 0) {
        return (
            <View style={S.styles.emptyContainer}>
                {selectedCharacter ? (
                    <Image 
                        source={{ uri: selectedCharacter.selectionThumbnailUrl }} // 캐릭터의 selectionThumbnailUrl 사용
                        style={S.styles.characterIcon}
                    />
                ) : (
                    <Image 
                        source={require('../../../../../assets/logo/logo-3.png')} /** @TODO 캐릭터 기본 이미지 선정 해야함. */
                        style={S.styles.characterIcon}
                    />
                )}
                <Text style={S.styles.characterText}>
                    {selectedCharacter?.name || '캐릭터'}가 그림을 그리고 있습니다!
                </Text>
                <Text style={S.styles.estimatedTimeText}>약 24시간 소요 예정</Text>
            </View>
        );
    } else {
        return (
            <View>
                <View style={S.styles.grid}>
                    {imageUrls.map((imageUrl, index) => (
                        <TouchableOpacity style={S.styles.imageContainer} key={index} onPress={() => handleImagePress(imageUrl)}>
                            <Image
                                source={{ uri: imageUrl }}
                                style={S.styles.image}
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
    };
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
                <View style={S.styles.modalBackground}>
                    <TouchableOpacity style={S.styles.modalContainer} onPress={onCloseModal}>
                        <View style={S.styles.modalContent}>
                            <TouchableOpacity style={S.styles.closeButton} onPress={onCloseModal}>
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
    )

}
