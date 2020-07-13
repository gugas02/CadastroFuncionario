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
    public enum EGender
    {
        [Description("Masculino")]
        [JsonProperty(PropertyName = "Masculino")]
        [EnumMember(Value = "Masculino")]
        Masculino = 1,
        [Description("Feminino")]
        [JsonProperty(PropertyName = "Feminino")]
        [EnumMember(Value = "Feminino")]
        Feminino = 2
    }
}
