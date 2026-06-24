export const UserResponse: Record<"USER_CREATED" | "USER_UPDATED" | "USER_NOT_FOUND" | "USER_CAN'T_BE_CREATED", {statusCode: number, message: string} > = {
    USER_CREATED: {
        statusCode: 201,
        message: "User created successfully"
    },
    USER_UPDATED: {
        statusCode: 200,
        message: "User updated successfully"
    },
    USER_NOT_FOUND: {
        statusCode: 404,
        message: "User not found"
    },
    "USER_CAN'T_BE_CREATED": {
        statusCode: 401,
        message: "User cannot be created..."
    }
}