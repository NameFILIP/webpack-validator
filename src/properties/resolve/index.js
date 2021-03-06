import Joi from 'joi'
import { absolutePath } from '../../types'
import { noRootFilesNodeModulesNameClash } from '../../rules'

export default ({ rules }) => Joi.object({
  alias: Joi.object().pattern(/.+/, Joi.string()),
  root: Joi.array().items(
    rules['no-root-files-node-modules-nameclash']
    ? absolutePath.concat(noRootFilesNodeModulesNameClash)
    : absolutePath
  ).single(),
  modulesDirectories: Joi.array().items(Joi.string()),
  fallback: Joi.array().items(absolutePath).single(),
  extensions: Joi.array().items([Joi.string().regex(/\..+/), Joi.string().valid('')]),
  packageMains: Joi.array(),
  packageAlias: Joi.string(),
  unsafeCache: [
    Joi.array().items(Joi.object().type(RegExp)).single(),
    Joi.bool().valid(true),
  ],
  // TODO: Angular config again. Is this valid?
  cache: Joi.boolean(),
})

