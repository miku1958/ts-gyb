import { EnumSubType, EnumType } from '../../types';
import { EnumTypeView } from '../views';
import { enumUncapitalize } from './SwiftValueTransformer';
import { getDocumentationLines } from './utils';

export class SwiftEnumTypeView implements EnumTypeView {
  constructor(private enumType: EnumType) {}

  get typeName(): string {
    return this.enumType.name;
  }

  get valueType(): string {
    switch (this.enumType.subType) {
      case EnumSubType.string:
        return 'String';
      case EnumSubType.number:
        return 'Int';
      default:
        throw Error('Unhandled enum subtype');
    }
  }

  get isNumberType(): boolean {
    return this.enumType.subType === EnumSubType.number;
  }

  get isStringType(): boolean {
    return this.enumType.subType === EnumSubType.string;
  }

  get members(): { key: string; value: string; documentationLines: string[]; last: boolean }[] {
    const { members } = this.enumType;

    return members.map((member, index) => ({
      key: enumUncapitalize(member.key),
      value: typeof member.value === 'string' ? `"${member.value}"` : `${member.value}`,
      documentationLines: getDocumentationLines(member.documentation),
      last: index === members.length - 1,
    }));
  }

  get documentationLines(): string[] {
    return getDocumentationLines(this.enumType.documentation);
  }
}