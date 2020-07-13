using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Runtime.Serialization;
using System.Text;

namespace Teste.Domain.Enums
{
    [JsonConverter(typeof(StringEnumConverter))]
    public enum ESkills
    {
        [Description("C#")]
        [JsonProperty(PropertyName = "C#")]
        [EnumMember(Value = "C#")]
        CSharp = 1,
        [Description("Java")]
        [JsonProperty(PropertyName = "Java")]
        [EnumMember(Value = "Java")]
        Java = 2,
        [Description("Angular")]
        [JsonProperty(PropertyName = "Angular")]
        [EnumMember(Value = "Angular")]
        Angular = 3,
        [Description("SQL")]
        [JsonProperty(PropertyName = "SQL")]
        [EnumMember(Value = "SQL")]
        SQL = 4,
        [Description("ASP")]
        [JsonProperty(PropertyName = "ASP")]
        [EnumMember(Value = "ASP")]
        ASP = 5,
    }
}
