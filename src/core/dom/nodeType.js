/**
 *
 * @author FuDesign2008@163.com
 * @date   2011-9-28
 * @time   上午10:38:53
 */


define(function (require) {
    var TYPE = require('../obj/type');
    /**
     * @see  http://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html
     * const unsigned short      ELEMENT_NODE       = 1;
     * const unsigned short      ATTRIBUTE_NODE     = 2;
     * const unsigned short      TEXT_NODE          = 3;
     * const unsigned short      CDATA_SECTION_NODE = 4;
     * const unsigned short      ENTITY_REFERENCE_NODE = 5;
     * const unsigned short      ENTITY_NODE        = 6;
     * const unsigned short      PROCESSING_INSTRUCTION_NODE = 7;
     * const unsigned short      COMMENT_NODE       = 8;
     * const unsigned short      DOCUMENT_NODE      = 9;
     * const unsigned short      DOCUMENT_TYPE_NODE = 10;
     * const unsigned short      DOCUMENT_FRAGMENT_NODE = 11;
     * const unsigned short      NOTATION_NODE      = 12;
     */
    return {
        ELEMENT_NODE: 1,
        ATTRIBUTE_NODE: 2,
        TEXT_NODE: 3,
        CDATA_SECTION_NODE: 4,
        ENTITY_REFERENCE_NODE: 5,
        ENTITY_NODE: 6,
        PROCESSING_INSTRUCTION_NODE: 7,
        COMMENT_NODE: 8,
        DOCUMENT_NODE: 9,
        DOCUMENT_TYPE_NODE: 10,
        DOCUMENT_FRAGMENT_NODE: 11,
        NOTATION_NODE: 12,
        /**
         * 得到节点类型
         * @param {Object} obj
         * @return {Integer}
         */
        getType: function (obj) {
            if (obj && obj.nodeType) {
                return obj.nodeType;
            }
        },
        /**
         * 判断是否是Node节点对象
         * @param {Object} obj
         * @return {Boolean}
         */
        isNode: function (obj) {
            var that = this,
                type = that.getType(obj);
            return TYPE.isNum(type) && type >= that.ELEMENT_NODE &&
                        type <= that.NOTATION_NODE;
        },
        isElement: function (obj) {
            return this.getType(obj) === this.ELEMENT_NODE;
        },
        isAttribute: function (obj) {
            return this.getType(obj) === this.ATTRIBUTE_NODE;
        },
        isText: function (obj) {
            return this.getType(obj) === this.TEXT_NODE;
        },
        isCDataSection: function (obj) {
            return this.getType(obj) === this.CDATA_SECTION_NODE;
        },
        isEntityReference: function (obj) {
            return this.getType(obj) === this.ENTITY_REFERENCE_NODE;
        },
        isEntity: function (obj) {
            return this.getType(obj) === this.ENTITY_NODE;
        },
        isProcessingInstruction: function (obj) {
            return this.getType(obj) === this.PROCESSING_INSTRUCTION_NODE;
        },
        isComment: function (obj) {
            return this.getType(obj) === this.COMMENT_NODE;
        },
        isDocument: function (obj) {
            return this.getType(obj) === this.DOCUMENT_NODE;
        },
        isDocumentType: function (obj) {
            return this.getType(obj) === this.DOCUMENT_TYPE_NODE;
        },
        isDocumentFragment: function (obj) {
            return this.getType(obj) === this.DOCUMENT_TYPE_NODE;
        },
        isNotation: function (obj) {
            return this.getType(obj) === this.NOTATION_NODE;
        }
    };
});
