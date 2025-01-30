

export interface Activity {
    // result: Array<Activity>,
    name?: string,
    description?: string
}

export interface ActivityResult {
    activities: Activity[];
    activity: Activity
}