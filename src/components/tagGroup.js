import { Badge, Center, Flex, HStack, useBreakpointValue, VStack } from "native-base";

const TagGroup = ({ tagList }) => {
    return (
        tagList.map(tag => {
            return <Badge colorScheme="info" key={tag} marginBottom={2} >{tag}</Badge>
        })

    );
}

export default TagGroup;