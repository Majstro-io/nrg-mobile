import { Button, Center, Modal, Text, useTheme } from "native-base";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import activityTypes from "../../data/activityTypes.json"
import ActivityCard from "../activityCard/activityCard";
import { addUserFavouriteActivity } from "../../store/slices/userPreferencesSlice";

const SelectFavouritesModal = () => {
    const favourites = useSelector((state) => state.userPreferences.favourites);
    const dispatch = useDispatch();
    const theme = useTheme();
    const [showModal, setShowModal] = useState(false);
    const favouriteActivityIds = new Set(favourites.map(fav => fav));

    const getActiveColor = (activityId) => {
        if (favouriteActivityIds.has(activityId)) {
            return { backgroundColor: theme.colors.primary[800] }
        } else {
            return { backgroundColor: theme.colors.primary[900], }
        }
    }

    return <Center>
        <Button onPress={() => setShowModal(true)}>Manage Favourites</Button>
        <Modal size={"xl"} isOpen={showModal} onClose={() => setShowModal(false)}>
            <Modal.Content height="100%">
                <Modal.CloseButton />
                <Modal.Header  >
                    <Text fontSize="2xl">
                        Select Favourites
                    </Text>
                </Modal.Header>
                <Modal.Body>
                    {activityTypes.content.map((type) => {
                        return <ActivityCard
                            key={type.id}
                            title={type.name}
                            onPress={() => dispatch(addUserFavouriteActivity(type.value))}
                            style={getActiveColor(type.value)}
                        />
                    })
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button width={"1/3"} onPress={() => {
                        setShowModal(false);
                    }}>
                        Done
                    </Button>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    </Center>;
};

export default SelectFavouritesModal;