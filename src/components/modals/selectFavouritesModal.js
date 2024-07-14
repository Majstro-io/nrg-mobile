import { Button, Center, Modal, Text } from "native-base";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import activities from '../../data/activities.json'
import ActivityCard from "../activityCard/activityCard";
import { addUserFavouriteActivity } from "../../store/slices/userPreferencesSlice";

const SelectFavouritesModal = () => {
    const favourites = useSelector((state) => state.userPreferences.favourites);
    const dispatch = useDispatch();

    const [showModal, setShowModal] = useState(false);
    const favouriteActivityIds = new Set(favourites.map(fav => fav.activityId));

    const getActiveColor = (activityId) => {
        if (favouriteActivityIds.has(activityId)) {
            return { backgroundColor: "#292929" }
        } else {
            return { backgroundColor: "#181725", }
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
                    {activities.content.map((activity) => {
                        return <ActivityCard
                            key={activity.id}
                            title={activity.name}
                            description={activity.description}
                            imageSource={activity.imageSource}
                            onPress={() => dispatch(addUserFavouriteActivity({ activityId: activity.id, id: activity.id }))}
                            style={getActiveColor(activity.id)}
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