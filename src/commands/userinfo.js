const { UserUtils } = require('../Utils')
const Moment = require('moment')
exports.run = async ({ bot, args, message, t, zSend, zEmbed }) => {
  let user = message.author

  if (!isNaN(args[0]) && args[0].length >= 16 && args.length <= 18) {
    if (args[0] !== message.author.id) {
      const SearchedUser = await UserUtils.searchUser(bot, args[0])

      if (SearchedUser === null) {
        zSend('bot-invite:CouldntFindThatUser', true)
        return
      }
      user = SearchedUser
    }
  }

  zEmbed.addField(t('userinfo:tag'), user.tag, true)
  zEmbed.addField(t('help:id'), user.id, true)
  zEmbed.addField(t('userinfo:accountCreatedIn'), Moment(user.createdAt).format('LL'), true)

  const Member = message.guild.member(user)
  if (Member !== null) {
    zEmbed.addField(t('userinfo:hexColor'), Member.displayHexColor, true)
    zEmbed.addField(t('userinfo:roleAmount'), Member.roles.size > 1 ? Member.roles.size : t('userinfo:noRole'), true)
    zEmbed.addField(t('userinfo:joinedAt'), Moment(Member.joinedAt).format('LL'), true)
  }
  zEmbed.setThumbnail(user.displayAvatarURL({ dynamic: true }))
  zSend(zEmbed)
}
