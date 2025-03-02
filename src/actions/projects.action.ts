'use server';

import { auth } from '@/auth';
import { errorResponse, successResponse } from '@/lib/apiResponse';
import prisma from '@/lib/prisma';

/**
 * Fetches all projects for the authenticated user.
 *
 * This function retrieves all non-deleted projects associated with the authenticated user,
 * ordered by their last update time in descending order.
 *
 * @returns {Promise<ApiResponse<Project[]>>} - A response object containing the list of projects or an error message.
 */
export async function getAllProjects() {
    try {
        const session = await auth();

        // Check for an authenticated session
        if (!session || !session.user) {
            return errorResponse('Not authenticated', 401);
        }

        const projects = await prisma.project.findMany({
            where: {
                userId: session.user.id,
                isDeleted: false,
            },
            orderBy: {
                updatedAt: 'desc',
            },
        });

        return successResponse(projects, 'Projects fetched successfully');
    } catch (error) {
        console.log(error);
        return errorResponse('Internal server error', 500);
    }
}

/**
 * Fetches the most recent projects for the authenticated user.
 *
 * This function retrieves the 5 most recently updated non-deleted projects
 * associated with the authenticated user, ordered by their last update time
 * in descending order.
 *
 * @returns {Promise<ApiResponse<Project[]>>} - A response object containing the list of recent projects or an error message.
 */
export async function getRecentProjects() {
    try {
        const session = await auth();

        // Check for an authenticated session
        if (!session || !session.user) {
            return errorResponse('Not authenticated', 401);
        }

        // Retrieve the 5 most recently updated projects
        const projects = await prisma.project.findMany({
            where: {
                userId: session.user.id,
                isDeleted: false,
            },
            orderBy: {
                updatedAt: 'desc',
            },
            take: 5,
        });

        return successResponse(projects, 'Projects fetched successfully');
    } catch (error) {
        console.log(error);
        return errorResponse('Internal server error', 500);
    }
}

/**
 * Recovers a deleted project for the authenticated user.
 *
 * This function updates the status of a deleted project to be active,
 * allowing it to be accessed again by the user.
 *
 * @param {string} projectId - The ID of the project to be recovered.
 * @returns {Promise<ApiResponse<Project>>} - A response object containing the recovered project or an error message.
 */
export const recoverProject = async (projectId: string) => {
    try {
        // Validate the project ID
        if (!projectId) {
            return errorResponse('Project ID is required', 400);
        }

        // Authenticate the user's session
        const session = await auth();

        // Check for a valid session and user
        if (!session || !session.user) {
            return errorResponse('Not authenticated', 401);
        }

        // Find the deleted project for the user
        const project = await prisma.project.findUnique({
            where: {
                id: projectId,
                userId: session.user.id,
                isDeleted: true,
            },
        });

        // Return error if project is not found
        if (!project) {
            return errorResponse('Project not found', 404);
        }

        // Update the project status to active
        const updatedProject = await prisma.project.update({
            where: {
                id: projectId,
            },
            data: {
                isDeleted: false,
            },
        });

        // Return success response with the updated project
        return successResponse(
            updatedProject,
            'Project recovered successfully'
        );
    } catch (error) {
        // Log and return an internal server error response
        console.log({ error });
        return errorResponse('Internal server error', 500);
    }
};

/**
 * Deletes a project for the authenticated user.
 *
 * This function updates the status of a project to be deleted,
 * preventing it from being accessed again by the user.
 *
 * @param {string} projectId - The ID of the project to be deleted.
 * @returns {Promise<ApiResponse<Project>>} - A response object containing the deleted project or an error message.
 */
export const deleteProject = async (projectId: string) => {
    try {
        // Validate the project ID
        if (!projectId) {
            return errorResponse('Project ID is required', 400);
        }

        // Authenticate the user's session
        const session = await auth();

        // Check for a valid session and user
        if (!session || !session.user) {
            return errorResponse('Not authenticated', 401);
        }

        // Find the project for the user
        const project = await prisma.project.findUnique({
            where: {
                id: projectId,
                userId: session.user.id,
            },
        });
        if (!project) {
            return errorResponse('Project not found', 404);
        }

        // Update the project status to deleted
        const updatedProject = await prisma.project.update({
            where: {
                id: projectId,
            },
            data: {
                isDeleted: true,
            },
        });

        // Return success response with the updated project
        return successResponse(updatedProject, 'Project deleted successfully');
    } catch (error) {
        // Log and return an internal server error response
        console.log({ error });
        return errorResponse('Internal server error', 500);
    }
};
