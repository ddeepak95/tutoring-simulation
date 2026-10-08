// Only call with an ID returned by this operation's successful createUser call.
// Existing assignments/history prevent profile deletion through foreign keys.
export async function removeNewAccount(client, userId) {
  const { error: profileError } = await client.from('profiles').delete().eq('id', userId);
  if (profileError) return false;
  const { error: authError } = await client.auth.admin.deleteUser(userId);
  return !authError;
}
