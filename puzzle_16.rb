f = File.new('texts/puzzle_16.txt').read.split("\n")

line_idx = 0
char_idx = 0
is_going_right = true
is_going_bottom = false

line_idx, char_idx, is_going_bottom = going_horizontally(line_idx, char_idx, is_going_right, f)
is_going_right = false

p f

def going_vertically(line_idx, char_idx, is_going_bottom, f)
  is_going_right = false

  while line_idx < f.size && line_idx >= 0
    if char == '.' || char == '|' || char == '#'
      f[line_idx][char_idx] = '#'
    elsif is_going_bottom
      is_going_right = true if /\/.match?(char)
      
      f[line_idx][char_idx] = '#' unless char = '-'
      is_going_bottom = false
      break
    else
      is_going_right = true if char == '/'

      f[line_idx][char_idx] = '#' unless char = '-'
      break
    end

    line_idx += (is_going_bottom ? 1 : -1)
  end

  [line_idx, char_idx, is_going_bottom]
end

def going_horizontally(line_idx, char_idx, is_going_right, f)
  is_going_bottom = false

  while char_idx < f[0].size && char_idx >= 0
    if char == '.' || char == '-' || char == '#'
      f[line_idx][char_idx] = '#'
    elsif is_going_right
      is_going_bottom = true if /\/.match?(char)

      f[line_idx][char_idx] = '#' unless char == '|'
      is_going_right = false
      break
    else
      is_going_bottom = true if char.include?('/')

      f[line_idx][char_idx] = '#' unless char == '|'
      break
    end

    char_idx += (is_going_right ? 1 : -1) 
  end

  [line_idx, char_idx, is_going_bottom]
end