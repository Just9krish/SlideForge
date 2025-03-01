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
