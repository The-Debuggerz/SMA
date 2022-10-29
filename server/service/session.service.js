export async function createSession(userId, userAgentfrom) {
  const session = await SessionModel.create({ user: userId, userAgent });

  return session.toJSON();
}
