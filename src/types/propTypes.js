// @flow
import PropTypes from 'prop-types'
import { getRotates, getFlips, getSizes } from '../functions/props'
import {
  AddExactValidator,
  AddThemeStylesValidator,
} from '../functions/propTypes'
import type { FlagIconCodeType, PropsTypeObjectType } from '../types/flow'

type MaybeFlagIconCodeType<T> = FlagIconCodeType | T

const FlagIconSizeType = PropTypes.oneOf(getSizes())
const FlagIconRotateType = PropTypes.oneOf(getRotates())
const FlagIconFlipType = PropTypes.oneOf(getFlips())

const makeFlagIconCodeType = <T>(
  codes: MaybeFlagIconCodeType<T>[],
  // eslint-disable-next-line arrow-body-style
): React$PropType$OneOf => {
  return PropTypes.oneOf(codes)
}

const makeFlagIconClassesObject = <T>(
  codes: MaybeFlagIconCodeType<T>[],
  // eslint-disable-next-line arrow-body-style
): PropsTypeObjectType => {
  return {
    code: makeFlagIconCodeType(codes).isRequired,
    size: FlagIconSizeType,
    squared: PropTypes.bool,
    rotate: FlagIconRotateType,
    flip: FlagIconFlipType,
  }
}

const makeFlagIconPropsTypeObject = <T>(
  codes: MaybeFlagIconCodeType<T>[],
  // eslint-disable-next-line arrow-body-style
): PropsTypeObjectType => {
  return {
    ...makeFlagIconClassesObject(codes),
    children: PropTypes.element,
    Component: PropTypes.string,
  }
}

export const MakeFlagIconPropsType = <T>(
  codes: MaybeFlagIconCodeType<T>[],
  // eslint-disable-next-line arrow-body-style
): PropsTypeObjectType => AddExactValidator(makeFlagIconPropsTypeObject(codes))

const flagIconOptionsType = {
  customCodes: PropTypes.object,
  themeStyles: PropTypes.object,
  useCssModules: PropTypes.bool,
}

export const MakeFlagIconOptionsPropType = (): PropsTypeObjectType =>
  AddExactValidator(AddThemeStylesValidator(flagIconOptionsType))
