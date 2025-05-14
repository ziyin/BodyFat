import { jwtDecode } from 'jwt-decode'

export function getRoleFromToken(token: string): string[] {
  try {
    const payload: any = jwtDecode(token)

    // ASP.NET 預設角色 claim key
    const roleClaim = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'

    // 有可能是 string 或 array
    const role = payload[roleClaim]
    return Array.isArray(role) ? role : [role]
  } catch (e) {
    return []
  }
}
