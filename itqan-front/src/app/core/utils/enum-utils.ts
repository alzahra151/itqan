
export class EnumUtils {
    static getEnumValues(enumType: any): { key: string, value: string }[] {
        return Object.keys(enumType)
            .filter(key => isNaN(Number(key)))  // Filter out numeric keys if it's a numeric enum
            .map(key => ({ key, value: enumType[key] }));
    }
}
