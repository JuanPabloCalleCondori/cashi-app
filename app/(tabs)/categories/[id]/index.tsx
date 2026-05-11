import {
    router,
    useFocusEffect,
    useLocalSearchParams,
} from "expo-router"

import {
    useCallback,
} from "react"

import {
    Alert,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native"

import {
    useCategories,
} from "../../../../hooks/useCategories"

export default function CategoryDetailScreen() {
    const { id } =
        useLocalSearchParams<{
            id: string
        }>()

    const {
        categories,
        eliminarCategoria,
        recargar,
    } = useCategories()

    useFocusEffect(
        useCallback(() => {
            void recargar()
        }, [recargar])
    )

    const category =
        categories.find(
            (c) => c.id === id
        )

    if (!category) {
        return (
            <View style={styles.centered}>
                <Text>
                    Categoría no encontrada
                </Text>

                <TouchableOpacity
                    onPress={() =>
                        router.back()
                    }
                >
                    <Text style={styles.link}>
                        Volver
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    const handleDelete = () => {
        if (Platform.OS === "web") {
            if (
                window.confirm(
                    "¿Eliminar categoría?"
                )
            ) {
                eliminarCategoria(id!)
                    .then(() => router.back())
            }
        } else {
            Alert.alert(
                "Eliminar",
                "¿Eliminar categoría?",
                [
                    {
                        text: "Cancelar",
                        style: "cancel",
                    },

                    {
                        text: "Eliminar",

                        style: "destructive",

                        onPress: async () => {
                            await eliminarCategoria(
                                id!
                            )

                            router.back()
                        },
                    },
                ]
            )
        }
    }

    return (
        <View style={styles.screen}>
            <View style={styles.container}>
                <Text style={styles.title}>
                    {category.name}
                </Text>

                <TouchableOpacity
                    style={styles.editButton}
                    onPress={() =>
                        router.push({
                            pathname:
                                "/(tabs)/categories/[id]/edit",

                            params: {
                                id,
                            },
                        })
                    }
                >
                    <Text style={styles.buttonText}>
                        Editar
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={handleDelete}
                >
                    <Text style={styles.buttonText}>
                        Eliminar
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: "#fff",
    },

    container: {
        padding: 20,
    },

    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 30,
    },

    editButton: {
        backgroundColor: "#2563eb",

        padding: 14,

        borderRadius: 8,

        alignItems: "center",

        marginBottom: 12,
    },

    deleteButton: {
        backgroundColor: "red",

        padding: 14,

        borderRadius: 8,

        alignItems: "center",
    },

    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },

    link: {
        marginTop: 12,
        color: "#2563eb",
    },
}) 